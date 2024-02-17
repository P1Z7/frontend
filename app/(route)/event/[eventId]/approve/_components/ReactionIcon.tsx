import { Fragment } from "react";
import DisableApproveIcon from "@/public/icon/edit-approve-disabled.svg";
import ApproveIcon from "@/public/icon/edit-approve.svg";
import DisableDeclineIcon from "@/public/icon/edit-reject-disabled.svg";
import DeclineIcon from "@/public/icon/edit-reject.svg";

interface Props {
  count: number;
  size?: "l" | "s";
  type: "approve" | "reject";
}

const SIZE = {
  s: { width: "16", height: "16" },
  l: {
    width: "20",
    height: "20",
  },
};

const ReactionIcon = ({ count, type, size = "s" }: Props) => {
  const reaction = Array.from({ length: count }, (_, idx) => (
    <Fragment key={idx}>{type === "approve" ? <ApproveIcon {...SIZE[size]} /> : <DeclineIcon {...SIZE[size]} />}</Fragment>
  ));
  const rest = Array.from({ length: 3 - count }, (_, idx) => (
    <Fragment key={idx}>{type === "approve" ? <DisableApproveIcon {...SIZE[size]} /> : <DisableDeclineIcon {...SIZE[size]} />}</Fragment>
  ));

  return (
    <>
      {reaction} {rest}
    </>
  );
};

export default ReactionIcon;
