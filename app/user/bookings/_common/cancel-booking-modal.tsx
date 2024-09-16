import { BookingType } from "@/app/interfaces";
import { cancelBooking } from "@/app/lib/actions";
import { message, Modal } from "antd";
import { useState } from "react";

function CancelBookingModal({
  booking,
  showCancelBookingModal,
  setShowCancelBookingModal,
}: {
  booking: BookingType;
  showCancelBookingModal: boolean;
  setShowCancelBookingModal: (show: boolean) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const onCancelBooking = async () => {
    try {
      setLoading(true);
      const response = await cancelBooking({
        bookingId: booking._id,
        paymentId: booking.paymentId,
      });

      if (response.success) {
        setShowCancelBookingModal(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<div className="text-red-700">Cancel Booking</div>}
      open={showCancelBookingModal}
      onCancel={() => setShowCancelBookingModal(false)}
      centered
      onOk={onCancelBooking}
      okButtonProps={{ loading }}
    >
      <div className="text-sm text-gray-600 mb-3">
        <span>{booking.room.name}</span>
      </div>
      <span className="text-gray-500 text-sm">
        are you sure you want to cancel the booking? this action cannot be
        undone.
      </span>
    </Modal>
  );
}

export default CancelBookingModal;
