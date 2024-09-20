export default function ReserveTitlePage({ titulo }: { titulo: string }) {
  return (
    <div className="relative m-4 mx-8">
      <h1 className="text-3xl  text-primary font-semibold">{titulo}</h1>
      <span className="absolute -left-4 w-20 h-1 bg-primary text-red-900"></span>
    </div>
  );
}
