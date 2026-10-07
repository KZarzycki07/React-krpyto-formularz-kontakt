 import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route,NavLink } from 'react-router-dom'
import Kontakt from "./kontakt";
import Formularz from "./formularz";
import "./Apps.css";


interface Product {
name: string
current_price: number
price_change_percentage_24h: number
}

  function App() {
    return (
    <BrowserRouter>
    <nav>
  <NavLink id="nav1" to="/">Home</NavLink>
  <NavLink id="nav2" to="/kontakt">Kontakt</NavLink>
  <NavLink id="nav3" to="/formularz">Formularz</NavLink>
    </nav>

<Routes>
     <Route path="/" element={<Home />} />
   <Route path="/kontakt" element={<Kontakt />}/>
   <Route path="/formularz" element={<Formularz />} />
</Routes>

    </BrowserRouter>
    )

  }

function Home() {

    type LoadingOf = "Ładowanie" | "Błąd" | "Sukces"
const [status,setstatus] = useState<LoadingOf>("Ładowanie")
const [tablica, settablica] = useState<Product[]>([])
const [filtr,setfiltr] = useState("")
const [waluta,setwaluta] = useState("pln")

useEffect(() => {

let controller = new AbortController()
let active = true
 async function pobieranie() {
   try {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${waluta}&order=market_cap_desc&per_page=100&page=1`, {signal:controller.signal}) 
  
  const rozpakuj = await data.json()


if(active) {
  settablica(rozpakuj)
  setstatus("Sukces")
}

}catch(error) {
if((error as Error).name !== 'AbortError') {
  setstatus("Błąd")
  alert("Nastąpił błąd pobierania danych")
}
 

}   

 
  }


  const refresh = setInterval(() => {
    pobieranie()
  }, 30000);

pobieranie()


return () => {
  active = false
  controller.abort()
  clearInterval(refresh)


}


},[waluta])

  const filteer = tablica.filter((produkt) => 
  produkt.name.toLowerCase().includes(filtr.toLowerCase())
)


return (
  <div id="aaa">
<input type="text" 
value={filtr}
onChange={(e) => setfiltr(e.target.value)}
placeholder="Wyszukaj walute"
/>


<select value={waluta} onChange={(e) => setwaluta(e.target.value)}>
<option value="usd">USD</option>
<option value="pln">PLN</option>
<option value="eur">EUR</option>
</select>



{status === "Sukces" && (
  <>
    <p style={{ color: 'green' }}>Dane pobrane poprawnie</p>
  
    <ul className="uklad">
      {filteer.map((waluta) => (
        <li key={waluta.name} className="grid">
          <span>{waluta.name}</span>
          <span>{waluta.current_price}</span>
          <span
            id="ssspan"
            style={{ color: waluta.price_change_percentage_24h >= 0 ? 'green' : 'red' }}
          >
            {waluta.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </li>
      ))}
    </ul>
  </>
)}


{status === 'Błąd' && (
  <p style={{color: 'red'}}>Nastąpił błąd</p>
)} 



  </div>
)

}







export default App