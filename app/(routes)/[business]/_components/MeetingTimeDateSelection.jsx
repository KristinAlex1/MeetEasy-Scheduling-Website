import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarCheck, Clock, LoaderIcon, MapPin, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeDateSelection from "./TimeDateSelection";
import UserFormInfo from "./UserFormInfo";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { render } from "@react-email/render";
import Email from "@/emails";

function MeetingTimeDateSelection({ eventInfo, businessInfo }) {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [isTimeSlotAvailable, setIsTimeSlotAvailable] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNote, setUserNote] = useState('');
  const [previousBookings, setPreviousBookings] = useState([]);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const db = getFirestore(app);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (eventInfo?.duration) {
      generateTimeSlots(eventInfo?.duration);
    }
  }, [eventInfo]);

  const generateTimeSlots = (interval) => {
    const startOfDay = 8 * 60; // 8 AM in minutes
    const endOfDay = 22 * 60; // 10 PM in minutes
    const totalSlots = (endOfDay - startOfDay) / interval;
    
    const slots = [];
    for (let i = 0; i < totalSlots; i++) {
      const totalMinutes = startOfDay + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours % 12 || 12;
      const period = hours >= 12 ? 'PM' : 'AM';
      const timeSlot = `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
      slots.push(timeSlot);
    }

    setTimeSlots(slots);
  };

  const onDateChange = (newDate) => {
    setDate(newDate);
    const dayOfWeek = format(newDate, "EEEE");
    if (businessInfo?.daysAvailable?.[dayOfWeek]) {
      fetchPreviousBookings(newDate);
      setIsTimeSlotAvailable(true);
    } else {
      setIsTimeSlotAvailable(false);
    }
  };

  const scheduleMeeting = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(userEmail)) {
      toast("Please provide a valid email address");
      return;
    }

    const documentId = Date.now().toString();
    setIsLoading(true);

    try {
      await setDoc(doc(db, "ScheduledMeetings", documentId), {
        businessName: businessInfo.businessName,
        businessEmail: businessInfo.email,
        selectedTime,
        selectedDate: date,
        formattedDate: format(date, "PPP"),
        timestamp: format(date, "t"),
        duration: eventInfo.duration,
        locationUrl: eventInfo.locationUrl,
        eventId: eventInfo.id,
        id: documentId,
        userName,
        userEmail,
        userNote,
      });

      toast("Meeting has been scheduled successfully!");
      await sendEmailNotification(userName); // Send email after successful booking
    } catch (error) {
      console.error("Error scheduling meeting:", error.message || error);
      toast("Failed to schedule meeting, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailNotification = async (user) => {
    try {
      const emailHtml = await render(
        <Email
          userFirstName={user}
          duration={eventInfo?.duration}
          meetingTime={selectedTime}
          date={format(date, "PPP")}
          meetingUrl={eventInfo.locationUrl}
          businessName={businessInfo?.businessName}
        />
      );

      const response = await fetch("https://api.useplunk.com/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PLUNK_API_KEY}`,
        },
        body: JSON.stringify({
          to: userEmail,
          subject: "Your Meeting Schedule Details",
          body: emailHtml,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error sending email");
      }

      router.replace("/confirmation");
    } catch (error) {
      console.error("Error sending email:", error.message || error);
      toast("Failed to send email, please try again.");
    }
  };

  const fetchPreviousBookings = async (selectedDate) => {
    const bookingsQuery = query(
      collection(db, "ScheduledMeetings"),
      where("selectedDate", "==", selectedDate),
      where("eventId", "==", eventInfo.id)
    );

    const querySnapshot = await getDocs(bookingsQuery);

    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push(doc.data());
    });
    setPreviousBookings(bookings);
  };

  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8 mx-10 md:mx-26 lg:mx-56 my-10"
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      <Image src="/logo3.png" alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        <div className="p-4 border-r">
          <h2 className="text-xl font-semibold">{businessInfo?.businessName}</h2>
          <h2 className="font-bold text-2xl">{eventInfo?.eventName || "Meeting Name"}</h2>
          <div className="mt-5 space-y-4">
            <h3 className="flex items-center gap-2">
              <Clock className="text-primary" /> {eventInfo?.duration} Min
            </h3>
            <h3 className="flex items-center gap-2">
              <MapPin className="text-primary" /> {eventInfo?.locationType} Meeting
            </h3>
            <h3 className="flex items-center gap-2">
              <CalendarCheck className="text-primary" /> {format(date, "PPP")}
            </h3>
            {selectedTime && (
              <h3 className="flex items-center gap-2">
                <Timer className="text-primary" /> {selectedTime}
              </h3>
            )}
            <Link href={eventInfo?.locationUrl || "#"} className="text-primary">
              {eventInfo?.locationUrl || "Location URL"}
            </Link>
          </div>
        </div>
        {step === 1 ? (
          <TimeDateSelection
            date={date}
            isTimeSlotAvailable={isTimeSlotAvailable}
            onDateChange={onDateChange}
            setSelectedTime={setSelectedTime}
            timeSlots={timeSlots}
            selectedTime={selectedTime}
            previousBookings={previousBookings}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>
      <div className="flex gap-3 justify-end mt-5">
        {step === 2 && (
          <Button variant="outline" onClick={() => setStep(1)} className="py-2">
            Back
          </Button>
        )}
        {step === 1 ? (
          <Button
            className="mt-10"
            disabled={!selectedTime || !date}
            onClick={() => setStep(2)}
          >
            Next
          </Button>
        ) : (
          <Button
            className="mt-10"
            disabled={isLoading || !userName || !userEmail || !userNote}
            onClick={scheduleMeeting}
          >
            {isLoading ? <LoaderIcon className="animate-spin" /> : "Confirm"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default MeetingTimeDateSelection;
