const url = 'https://server-rincon-de-la-cordillera.onrender.com';
export async function reservarFechas(date: any) {
  const response = await fetch(url + '/api/reserve/reserveDate', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(date),
  });
  const res = await response.json();
  return res;
}

export async function GetMyReserve() {
  const response = await fetch(url + '/api/reserve/myReserve', {
    credentials: 'include',
  });
  const res = await response.json();
  console.log(res);
  return res;
}
export async function getAllReserve() {
  const response = await fetch(url + '/api/reserve/allReserve', {
    credentials: 'include',
  });
  const res = await response.json();
  console.log(res);
  return res;
}
export async function getPendingReserve() {
  const response = await fetch(url + '/api/reserve/pendingReserve', {
    credentials: 'include',
  });
  const res = await response.json();
  console.log(res);
  return res;
}
export async function checkFreeRoom(startDate: string, endDate: string) {
  const queryParams = new URLSearchParams({ startDate, endDate }).toString();

  const response = await fetch(
    `https://server-rincon-de-la-cordillera.onrender.com/api/reserve/checkFreeRoom?${queryParams}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const res = await response.json();
  console.log(res);
  return res;
}
