interface GhostDayProps {
  day: number;
  hoy: boolean;
}

const GhostDay: React.FC<GhostDayProps> = ({ day, hoy }) => {
  return (
    <div
      className={`day ghost ${
        hoy ? 'border-2 border-solid border-primary' : ''
      }`}
    >
      {day}
    </div>
  );
};

export default GhostDay;
