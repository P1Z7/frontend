import Button from "@/components/button";

const BottomButton = () => {
  return (
    <div className="sticky bottom-0 w-full border-t border-gray-50 bg-white-black px-20 pb-24 pt-12">
      <Button size="xl" type="lined">
        후기 작성하기
      </Button>
    </div>
  );
};

export default BottomButton;
