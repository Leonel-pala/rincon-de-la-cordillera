import { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import FormReserve from './reserve/formReserve';
import GhostDay from './calendar/ghostDay';
import clsx from 'clsx';

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

  const [start, setStart] = useState(new Date(1, 1, 1));
  const [end, setEnd] = useState(new Date());

  const [startPrint, setStartPrint] = useState('-');
  const [endPrint, setEndPrint] = useState('-');

  const [mes, setMes] = useState(currMonth);
  const [anno, setAnno] = useState(currYear);

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
  function fechaEnRango(fecha: any, fechaInicio: any, fechaFin: any) {
    const [dia, mes, anio] = fecha.split('/').map(Number);
    const fechaReserva = new Date(anio, mes - 1, dia); // Crear objeto Date (mes es 0-indexed)

    return fechaReserva >= fechaInicio && fechaReserva <= fechaFin;
  }
  const selectDays = useCallback(
    (dia: number) => {
      const newDate = new Date(anno, mes, dia);
      const fecha = `${dia}/${mes + 1}/${anno}`;

      if (startPrint === '-') {
        setStart(newDate);
        setStartPrint(fecha);
        setEnd(new Date());
        setEndPrint('-');
      } else if (newDate > start) {
        const hola = reservas.filter((reserva) =>
          fechaEnRango(reserva.fecha, start, newDate)
        );
        if (hola[0] == undefined) {
          if (newDate > end) {
            setEnd(newDate);
            setEndPrint(fecha);
          } else {
            const diffStart = Math.abs(newDate.getTime() - start.getTime());
            const diffEnd = Math.abs(newDate.getTime() - end.getTime());

            if (diffStart < diffEnd) {
              setStart(newDate);
              setStartPrint(fecha);
            } else {
              setEnd(newDate);
              setEndPrint(fecha);
            }
          }
        } else {
          setStart(newDate);
          setStartPrint(fecha);
          setEnd(new Date());
          setEndPrint('-');
        }
      } else {
        setStart(newDate);
        setStartPrint(fecha);
        setEnd(new Date());
        setEndPrint('-');
      }
    },
    [mes, anno, start, end, startPrint]
  );

  const daysMonthActually = new Date(anno, mes + 1, 0).getDate();
  const reservas = [
    { fecha: '27/8/2024', status: 'confirm' },
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
        <GhostDay day={i} hoy={isCurrentDay}></GhostDay>
      );
    } else if (search) {
      monthActuallyComponent.push(
        <div
          className="relative day flex justify-center"
          key={i}
          onClick={() => {
            if (search.status === 'pending') selectDays(i);
          }}
        >
          <span
            className={
              'absolute bg-blue-400 h-8 z-10 ' +
              clsx({
                'w-full right-0':
                  new Date(anno, mes, i) > start &&
                  new Date(anno, mes, i) < end,
                'w-1/2 left-0': endPrint == `${i}/${mes + 1}/${anno}`,
                'w-1/2 right-0':
                  startPrint == `${i}/${mes + 1}/${anno}` && endPrint !== '-',
              })
            }
          ></span>
          <div
            className={
              `z-20 h-8 w-8 leading-loose rounded-full  ` +
              clsx({
                'bg-green-600 cursor-default l': search.status === 'confirm',
                'bg-blue-700 l':
                  startPrint == `${i}/${mes + 1}/${anno}` ||
                  endPrint == `${i}/${mes + 1}/${anno}`,
                'bg-blue-500 l':
                  new Date(anno, mes, i) > start &&
                  new Date(anno, mes, i) < end,
              }) +
              'bg-orange-200'
            }
          >
            {i}
          </div>
        </div>
      );
    } else {
      monthActuallyComponent.push(
        <div className="relative day flex justify-center" key={i}>
          <span
            className={
              'absolute bg-blue-400 h-8 z-10 ' +
              clsx({
                'w-full right-0':
                  new Date(anno, mes, i) > start &&
                  new Date(anno, mes, i) < end,
                'w-1/2 left-0': endPrint == `${i}/${mes + 1}/${anno}`,
                'w-1/2 right-0':
                  startPrint == `${i}/${mes + 1}/${anno}` && endPrint !== '-',
              })
            }
          ></span>
          <div
            className={`z-20 cursor-pointer h-8 w-8 leading-loose rounded-full hover:bg-orange-400 ${clsx(
              {
                'bg-blue-700':
                  startPrint == `${i}/${mes + 1}/${anno}` ||
                  endPrint == `${i}/${mes + 1}/${anno}`,
                'bg-blue-500':
                  new Date(anno, mes, i) > start &&
                  new Date(anno, mes, i) < end,
              }
            )}`}
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
    if (startPrint != '-' && endPrint != '-') {
      openModal();
    }
  };

  return (
    <>
      <FormReserve
        isOpen={isModalOpen}
        dateList={{ startDate: startPrint, endDate: endPrint }}
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
          <div className="grid grid-cols-7 max-w-[600px] border-2 border-solid border-primary">
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
        <div className="flex gap-1 max-w-[535px] w-full min-h-12 bg-primary overflow-y-auto p-2 text-white text-center ">
          <div>
            <b>Inicio:</b>{' '}
            <span className="bg-[#61b499] px-1 w-[85px]  text-center">
              {startPrint}
            </span>
          </div>
          <div>
            <b>Fin:</b>{' '}
            <span className="bg-[#61b499] px-1 w-[85px]  text-center">
              {endPrint}{' '}
            </span>
          </div>
        </div>
        <button
          className={`text-[#fff] py-1 mt-2 text-2xl px-2 ${
            startPrint != '-' && endPrint != '-'
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
