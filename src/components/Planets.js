import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (queryFn) => {
  const {queryKey} =queryFn
  const page = queryKey[1]
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
}

const Planets = () => {
  const [ page, setPage ] = useState(1);
   const { data, status } = useQuery(['planets', page], fetchPlanets );
  // const {
  //   resolvedData,
  //   latestData,
  //   status
  // } = usePaginatedQuery (['planets', page], fetchPlanets);
  

  return (
    <div>
    <h2>Planets</h2>

    {/* <button onClick={() => setPage((prevPage) => prevPage - 1)}>Prev</button>
    <button onClick={() => setPage((prevPage) => prevPage - 1)}>Next</button>
    <button onClick={() => setPage(1)}>Page 1</button>
    <button onClick={() => setPage(2)}>Page 2</button>
    <button onClick={() => setPage(3)}>Page 3</button> */}
    

    {status === "loading" && (<div>Loading data...</div>)}
    {status === "error" && (<div>Error fetching data</div>)}
    {status === "success" && (
    <>
  <button onClick={() => setPage(old => Math.max(old - 1, 1))}
  disabled = {page === 1}>Previous page</button>
  <span>{ page }</span>
  <button onClick={() => setPage(old => Math.max(old + 1, 1) )}
  disabled = {!data || !data.next }>Next Page</button>
    <div>
      { data?.results?.map(planet => <Planet key={planet.name} planet={planet} />)}
      </div>
      </>
      )}
    
    </div>
  )
}

export default Planets;