import React, { useState,} from "react"


function Formularz() {
const [werdykt,setwerdykt] = useState('WybierzWer')
const [spec,setspec] = useState<string>('Wybierz')
const [sukces,setsukces] = useState<boolean | null>(null)
const [dane,setdane] = useState ({
werdykt: '',
imie: '',
nazwisko: '',
mail: '',
firma: '',
specjalizacja: '',
poprawki: '',
data_rozmowy: ''

})
const [ladowanie,setladowanie] = useState<boolean | null>(null)
const [lista,setlista] = useState<string[]>([])
const [poprawa,setpoprawa] = useState("")

const DanaData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdane({
        ...dane,
        data_rozmowy: event.target.value
    })
}



const DaneImie = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdane({
        ...dane,
        imie: event.target.value
    })
}

const DaneNazwisko = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdane({
        ...dane,
        nazwisko: event.target.value
    })
}

const DanyMail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdane({
        ...dane,
        mail: event.target.value
    })


}

const NazwaFirmy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdane({
        ...dane,
        firma: event.target.value
    })
}


const blockEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if(event.key === 'Enter') {
        const target = event.target as HTMLInputElement
        if(target.name === 'poprawa') {
            event.preventDefault()
        }
    }
}

const Poprawki = (e: React.KeyboardEvent<HTMLElement>) => {
    if(e.key === 'Enter') {
   const utnij = poprawa.trim()
  if(utnij === '') return
  if(lista.includes(utnij)) return
 setlista([...lista,utnij])
 setpoprawa('')
    }
}



const mail = async  (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault()
try {
    

  setladowanie(true)

  const odpowiedz = await fetch("https://formsubmit.co/ajax/zarzycki421@gmail.com", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  body: JSON.stringify(dane)
  });
  
  if(odpowiedz.ok) {
    setsukces(true)

    setdane({imie: '', nazwisko: '', mail: '',firma: '',poprawki: '',specjalizacja: '',werdykt:'',data_rozmowy:''})

  } else {
    setsukces(false)

  } 
} catch(error) {
    console.log("Nieoczekiwany bład")
    setsukces(false)
} finally {
    setladowanie(false)
}
}



return (
    <>
    <div id="layoutform">
        
        <form onSubmit={mail} onKeyDown={blockEnter}>

        
            <div id="boxform">

<h3>Werdykt</h3>
        
 <select name="werdykt" value={werdykt} onChange={(e) => {setwerdykt(e.target.value); setdane({...dane,werdykt: e.target.value})}}>
 
  <option value="WybierzWer">--Wybierz Werdykt--</option>
 
  <option value="Rozmowa">Rozmowa Kwalfikacyjne</option>

  <option value="Odrzuczenie">Dalsza Nauka</option>
    

        </select>
    
    <input type="date"  name="data" disabled={werdykt === 'Odrzuczenie'} value={dane.data_rozmowy} onChange={DanaData} />
       
    
       
        <input type="text" name="imie" value={dane.imie} onChange={DaneImie} placeholder="Imię" required disabled={werdykt === 'Odrzuczenie'}/>
        
        <input type="text" name="nazwisko" value={dane.nazwisko} onChange={DaneNazwisko} placeholder="Nazwisko" required disabled={werdykt === 'Odrzuczenie'}/>
        
        <input type="text" name="Firma" value={dane.firma} onChange={NazwaFirmy} placeholder="Nazwa Firmy" required disabled={werdykt === 'Odrzuczenie'}/>

        <input type="email" name="Mail" value={dane.mail} onChange={DanyMail} placeholder="E-mail" required disabled={werdykt === 'Odrzuczenie'}/>



<select name="specjalizacja" value={spec} disabled={werdykt === 'Odrzuczenie'}  onChange={(e) => {setspec(e.target.value); setdane({...dane,specjalizacja : e.target.value}) }}>

    <option value="Wybierz">--Wybierz Specjalizację--</option>
    <option value="Frontend">Frontend</option>
    <option value="Backend">Backend</option>
    <option value="Fullstack">Fullstack</option>
</select>

{

(spec === 'Backend' || spec === 'Fullstack') && (
    <p>Zajmuję się tylko Frontendem :)</p>
)

}



<input type="text" name="poprawa" value={poprawa}  onKeyDown={Poprawki} placeholder="Co mogę poprawić ?"   onChange={(e) => { setpoprawa(e.target.value); setdane({...dane,poprawki: e.target.value})}}/>

<ul>
{lista.map((item,index) => (
 <li key={`${item}-${index}`}>{item}</li>
))}
    
</ul>

     <button type="submit" disabled={ladowanie || sukces === true || spec !== 'Frontend'}>
{ladowanie ?
(
    'wysyłanie...'
) : sukces ?
(
    'Wysłano'
) :
(
    'Wyslij'
)
}
</button>

{
    sukces === true && (
        <div>Sukces,serdecznie dziękuję za poświęcenie czasu</div> 
        
    )

}

{
    sukces === false && (
        <div> Coś poszło nie tak,spróbuj ponownie pozniej</div>
    )

}
</div>



         </form>
    </div>


    
    </>
)



}



export default Formularz
