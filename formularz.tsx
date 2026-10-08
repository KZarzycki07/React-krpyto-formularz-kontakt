import React, { useState,} from "react"


function Formularz() {
const [verdict, setVerdict] = useState<string>('SelectVer')
const [spec, setSpec] = useState<string>('Wybierz')
const [success, setSuccess] = useState<boolean | null>(null)
const [data, setdata] = useState ({
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
    setdata({
        ...data,
        data_rozmowy: event.target.value
    })
}



const DaneImie = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdata({
        ...data,
        imie: event.target.value
    })
}

const DaneNazwisko = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdata({
        ...data,
        nazwisko: event.target.value
    })
}

const DanyMail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdata({
        ...data,
        mail: event.target.value
    })


}

const NazwaFirmy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdata({
        ...data,
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
   const cutSpace = poprawa.trim()
  if(cutSpace === '') return
  if(lista.includes(cutSpace)) return
 setlista([...lista,cutSpace])
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
  body: JSON.stringify(data)
  });
  
  if(odpowiedz.ok) {
    setSuccess(true)

    setdata({imie: '', nazwisko: '', mail: '',firma: '',poprawki: '',specjalizacja: '',werdykt:'',data_rozmowy:''})

  } else {
    setSuccess(false)

  } 
} catch(error) {
    console.log("Nieoczekiwany bład")
    setSuccess(false)
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
        
 <select name="werdykt" value={verdict} onChange={(e) => {setVerdict(e.target.value); setdata({...data,werdykt: e.target.value})}}>
 
  <option value="WybierzWer">--Wybierz Werdykt--</option>
 
  <option value="Rozmowa">Rozmowa Kwalfikacyjne</option>

  <option value="Odrzuczenie">Dalsza Nauka</option>
    

        </select>
    
    <input type="date"  name="data" disabled={verdict === 'Odrzuczenie'} value={data.data_rozmowy} onChange={DanaData} />
       
    
       
        <input type="text" name="imie" value={data.imie} onChange={DaneImie} placeholder="Imię" required disabled={verdict === 'Odrzuczenie'}/>
        
        <input type="text" name="nazwisko" value={data.nazwisko} onChange={DaneNazwisko} placeholder="Nazwisko" required disabled={verdict === 'Odrzuczenie'}/>
        
        <input type="text" name="Firma" value={data.firma} onChange={NazwaFirmy} placeholder="Nazwa Firmy" required disabled={verdict === 'Odrzuczenie'}/>

        <input type="email" name="Mail" value={data.mail} onChange={DanyMail} placeholder="E-mail" required disabled={verdict === 'Odrzuczenie'}/>



<select name="specjalizacja" value={spec} disabled={verdict=== 'Odrzuczenie'}  onChange={(e) => {setSpec(e.target.value); setdata({...data,specjalizacja : e.target.value}) }}>

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



<input type="text" name="poprawa" value={poprawa}  onKeyDown={Poprawki} placeholder="Co mogę poprawić ?"   onChange={(e) => { setpoprawa(e.target.value); setdata({...data,poprawki: e.target.value})}}/>

<ul>
{lista.map((item,index) => (
 <li key={`${item}-${index}`}>{item}</li>
))}
    
</ul>

     <button type="submit" disabled={ladowanie || success === true || spec !== 'Frontend'}>
{ladowanie ?
(
    'wysyłanie...'
) : success ?
(
    'Wysłano'
) :
(
    'Wyslij'
)
}
</button>

{
    success === true && (
        <div>Sukces,serdecznie dziękuję za poświęcenie czasu</div> 
        
    )

}

{
    success === false && (
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
