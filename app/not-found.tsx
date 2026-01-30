import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <Image
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2w5NThkaW44dTBmM2hlcmUxemZzczBnaXMxcGdtM2plZDdvemtmYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UHAYP0FxJOmFBuOiC2/giphy.gif"
        alt="404"
        width={500}
        height={376}
        className="block mx-auto mt-10"
      />
    </>
  );
}
