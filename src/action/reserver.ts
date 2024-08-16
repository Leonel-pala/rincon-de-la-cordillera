export async function reservarFechas(date: any) {
  const response = await fetch(
    'http://localhost:3000/api/reserve/reserveDate',
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(date),
    }
  );
  const res = await response.json();
  return res;
}

export async function GetMyReserve() {
  const response = await fetch('http://localhost:3000/api/reserve/myReserve', {
    credentials: 'include',
  });
  const res = await response.json();
  console;
}
export async function getAllReserve() {
  const response = await fetch('http://localhost:3000/api/reserve/allReserve', {
    credentials: 'include',
  });
  const res = await response.json();
  console.log(res);
  return res;
}
