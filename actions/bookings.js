export async function createBooking(bookingData) {
    try{
        const event = await db.event.findUnique({
            where: {
                id: bookingData.eventId
            },
            include: {
                bookings: true
            }
        });

        if (!event) {
            throw new Error("Event not found");
        }
        
    } catch (error) {
        console.error("Error creating booking:", error?.message || error);
    }
}