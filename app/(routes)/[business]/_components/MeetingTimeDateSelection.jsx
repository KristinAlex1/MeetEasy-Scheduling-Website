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
  const [timeSlots, setTimeSlots] = useState();
  const [enableTimeSlot, setEnabledTimeSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userNote, setUserNote] = useState("");
  const [prevBooking, setPrevBooking] = useState([]);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo]);

  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });

    console.log("Generated Time Slots:", slots);
    setTimeSlots(slots);
  };

  const handleDateChange = (date) => {
    setDate(date);
    const day = format(date, "EEEE");
    if (businessInfo?.daysAvailable?.[day]) {
      getPrevEventBooking(date);
      setEnabledTimeSlot(true);
    } else {
      setEnabledTimeSlot(false);
    }
  };

  const handleScheduleEvent = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(userEmail)) {
      toast("Enter a valid email address");
      return;
    }
    const docId = Date.now().toString();
    setLoading(true);
    try {
      await setDoc(doc(db, "ScheduledMeetings", docId), {
        businessName: businessInfo.businessName,
        businessEmail: businessInfo.email,
        selectedTime,
        selectedDate: date,
        formatedDate: format(date, "PPP"),
        formatedTimeStamp: format(date, "t"),
        duration: eventInfo.duration,
        locationUrl: eventInfo.locationUrl,
        eventId: eventInfo.id,
        id: docId,
        userName,
        userEmail,
        userNote,
      });

      toast("Meeting Scheduled successfully!");
      await sendEmail(userName); // Trigger the email after Firestore write
    } catch (error) {
      console.error("Error scheduling meeting:", error.message || error);
      toast("Failed to schedule meeting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (user) => {
    try {
      // Ensure you correctly import your Email component
      const emailHtml = await render(
        <Email
          userFirstName={user}
          duration={eventInfo?.duration}
          meetingTime={selectedTime}
          date={format(date, "PPP")}
          meetingUrl={eventInfo.locationUrl}
          businessName={businessInfo?.businessName}
        />
      ); // Await to resolve the promise into HTML string

      console.log("Generated Email HTML:", emailHtml); // For debugging

      // Use Plunk API to send the email
      const response = await fetch("https://api.useplunk.com/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PLUNK_API_KEY}`,
        },
        body: JSON.stringify({
          to: userEmail,
          subject: "Meeting Schedule Details",
          body: emailHtml, // Use the rendered email HTML
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send email");
      }

      console.log("Email sent successfully!");
      router.replace("/confirmation");
    } catch (error) {
      console.error("Error sending email:", error.message || error);
      toast("Failed to send email. Please try again.");
    }
  };

  const getPrevEventBooking = async (date_) => {
    const q = query(
      collection(db, "ScheduledMeetings"),
      where("selectedDate", "==", date_),
      where("eventId", "==", eventInfo.id)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log("--", doc.data());
      setPrevBooking((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8
    mx-10
    md:mx-26
    lg:mx-56
    my-10"
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      <Image src="/logo.svg" alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        <div className="p-4 border-r">
          <h2>{businessInfo?.businessName}</h2>
          <h2 className="font-bold text-3xl">
            {eventInfo?.eventName ? eventInfo?.eventName : "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {eventInfo?.duration} Min{" "}
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {eventInfo?.locationType} Meeting{" "}
            </h2>
            <h2 className="flex gap-2">
              <CalendarCheck />
              {format(date, "PPP")}{" "}
            </h2>
            {selectedTime && (
              <h2 className="flex gap-2">
                <Timer />
                {selectedTime}{" "}
              </h2>
            )}

            <Link
              href={eventInfo?.locationUrl ? eventInfo?.locationUrl : "#"}
              className="text-primary"
            >
              {eventInfo?.locationUrl}
            </Link>
          </div>
        </div>
        {step === 1 ? (
          <TimeDateSelection
            date={date}
            enableTimeSlot={enableTimeSlot}
            handleDateChange={handleDateChange}
            setSelectedTime={setSelectedTime}
            timeSlots={timeSlots}
            selectedTime={selectedTime}
            prevBooking={prevBooking}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>
      <div className="flex gap-3 justify-end">
        {step === 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step === 1 ? (
          <Button
            className="mt-10 float-right"
            disabled={!selectedTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={!userEmail || !userName}
            onClick={handleScheduleEvent}
          >
            {loading ? <LoaderIcon className="animate-spin" /> : "Schedule"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default MeetingTimeDateSelection;
``;
