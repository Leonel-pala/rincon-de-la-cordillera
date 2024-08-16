import { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import FormReserve from './reserve/formReserve';

export default function DatePicker() {
  const monthName = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const dayName = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth();
  const currDay = date.getDate();

  const [mes, setMes] = useState(currMonth);
  const [anno, setAnno] = useState(currYear);
  const [fechasSelect, setFechasSelect] = useState<string[]>([]);

  const saltoMes = useCallback(
    (action: string) => {
      setMes((prevMes) => {
        let newMes = prevMes;
        let newAnno = anno;

        if (action === 'sumar') {
          newMes = (prevMes + 1) % 12;
          if (newMes === 0) {
            newAnno += 1;
            setAnno(newAnno);
          }
        } else if (action === 'restar') {
          if (prevMes === currMonth && newAnno === currYear) return prevMes;
          newMes = prevMes === 0 ? 11 : prevMes - 1;
          if (newMes === 11) {
            newAnno -= 1;
            setAnno(newAnno);
          }
        }

        return newMes;
      });
    },
    [anno, currMonth, currYear]
  );

  const selectDays = useCallback(
    (dia: number) => {
      const fecha = `${dia}/${mes + 1}/${anno}`;
      setFechasSelect((prevFechas) => {
        const updatedFechas = prevFechas.includes(fecha)
          ? prevFechas.filter((item) => item !== fecha)
          : [...prevFechas, fecha];

        return updatedFechas.sort((a, b) => {
          const dateA = new Date(a.split('/').reverse().join('/'));
          const dateB = new Date(b.split('/').reverse().join('/'));
          return dateA.getTime() - dateB.getTime();
        });
      });
    },
    [mes, anno]
  );

  const daysMonthActually = new Date(anno, mes + 1, 0).getDate();
  const reservas = [
    { fecha: '8/8/2024', status: 'pending' },
    { fecha: '9/8/2024', status: 'pending' },
    { fecha: '10/8/2024', status: 'confirm' },
    { fecha: '11/8/2024', status: 'confirm' },
    { fecha: '31/8/2024', status: 'confirm' },
  ];

  const monthActuallyComponent = [];
  for (let i = 1; i <= daysMonthActually; i++) {
    const fecha = `${i}/${mes + 1}/${anno}`;
    const isCurrentDay =
      i === currDay && mes === currMonth && anno === currYear;
    const search = reservas.find((fechaRes) => fechaRes.fecha === fecha);
    const isGhostDay = i <= currDay && mes === currMonth && anno === currYear;

    if (isGhostDay) {
      monthActuallyComponent.push(
        <div
          className={`day ghost ${
            isCurrentDay ? 'border-2 border-solid border-primary' : ''
          }`}
          key={i}
        >
          {i}
        </div>
      );
    } else if (search) {
      monthActuallyComponent.push(
        <div
          className="day flex justify-center"
          key={i}
          onClick={() => {
            if (search.status === 'pending') selectDays(i);
          }}
        >
          <div
            className={`h-8 w-8 leading-loose rounded-full ${
              search.status === 'confirm'
                ? 'bg-green-600 cursor-default'
                : fechasSelect.includes(fecha)
                ? 'bg-orange-500 cursor-pointer hover:bg-orange-400'
                : 'bg-orange-300 cursor-pointer hover:bg-orange-400'
            }`}
          >
            {i}
          </div>
        </div>
      );
    } else {
      monthActuallyComponent.push(
        <div className="day flex justify-center" key={i}>
          <div
            className={`cursor-pointer h-8 w-8 leading-loose rounded-full hover:bg-orange-400 ${
              fechasSelect.includes(fecha)
                ? 'bg-orange-500 hover:bg-orange-400'
                : ''
            }`}
            onClick={() => selectDays(i)}
          >
            {i}
          </div>
        </div>
      );
    }
  }

  const daysFirstDayMonth = new Date(anno, mes, 1).getDay();
  const monthPreviousComponent = [];
  const daysPreviousMonth = new Date(anno, mes, 0).getDate();

  for (let i = daysFirstDayMonth; i > 0; i--) {
    monthPreviousComponent.push(
      <div className="ghost day" key={daysPreviousMonth - i + 1}>
        {daysPreviousMonth - i + 1}
      </div>
    );
  }

  const daysFirstDayNextMonth = new Date(anno, mes, daysMonthActually).getDay();
  const monthNextComponent = [];
  let a = 0;
  for (let i = daysFirstDayNextMonth; i < 6; i++) {
    a++;
    monthNextComponent.push(
      <div className="ghost day" key={a}>
        {a}
      </div>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitDate = () => {
    if (fechasSelect.length > 0) {
      openModal();
    }
  };

  return (
    <>
      <FormReserve
        isOpen={isModalOpen}
        dateList={fechasSelect}
        onClose={closeModal}
      />

      <div className="relative flex flex-col items-center mt-7">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between w-full bg-primary rounded-full">
            <button
              className={`rounded-full text-[#fff] p-2 text-xs border-4 border-solid border-[#fff] -translate-x-1 ${
                mes === currMonth && anno === currYear
                  ? 'bg-primary-foreground cursor-default'
                  : 'bg-primary'
              }`}
              onClick={() => saltoMes('restar')}
            >
              <ArrowLeft />
            </button>
            <h2 className="text-2xl text-[#fff] leading-loose h-max">
              {monthName[mes]} - {anno}
            </h2>
            <button
              className="text-[#fff] rounded-full bg-primary p-2 border-4 border-solid border-[#fff] translate-x-1"
              onClick={() => saltoMes('sumar')}
            >
              <ArrowRight />
            </button>
          </div>
          <div className="grid grid-cols-7 max-w-[600px] border-2 border-solid">
            {dayName.map((day) => (
              <div
                key={day}
                className="truncate text-center bg-primary text-[#fff] p-1 box-border"
              >
                {day}
              </div>
            ))}
            {monthPreviousComponent}
            {monthActuallyComponent}
            {monthNextComponent}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 max-w-[535px] w-full min-h-12 bg-second-foreground overflow-y-auto p-2 text-center text-[#fff]">
          {fechasSelect.map((fecha) => (
            <span key={fecha} className="bg-primary h-max px-2 py-1 rounded-lg">
              {fecha}
            </span>
          ))}
        </div>
        <button
          className={`text-[#fff] py-1 mt-2 text-2xl px-2 ${
            fechasSelect.length > 0
              ? 'bg-primary cursor-pointer'
              : 'bg-primary-foreground cursor-default'
          }`}
          onClick={submitDate}
        >
          Enviar solicitud
        </button>
      </div>
    </>
  );
}
