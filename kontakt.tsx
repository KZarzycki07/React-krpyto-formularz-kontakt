import { useState } from "react";

function Kontakt() {

    const strona = "StronaKontaktowa.pl"
  const Numer = "777-777-777"
    const mail = "zarzycki421@gmail.com"
    const [wartosc,setwartosc] = useState('Proszę wybrać opcję kontaktu')

    return (
        <>
     <div id="calastrona">
<div id="kontakt">
<aside>
<button onClick={()=> setwartosc(strona)} className="przycisk-bok">Strona internetowa</button>
   <button onClick={() => setwartosc(Numer)} className="przycisk-bok">Numer telefonu</button>
   <button onClick={() => setwartosc(mail)} className="przycisk-bok">E-mail</button>
   <div id="wartosc">
  <p>{wartosc}</p>
   </div>
</aside>
</div>

<div id="uslugi">
<section id="html">HTML

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque assumenda perferendis tempore voluptatem delectus hic, sapiente, fuga repellendus doloremque deleniti natus nisi laboriosam vel aliquid excepturi dolorem quas earum voluptatum.</p>

</section>
<section>CSS
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore dignissimos optio reprehenderit quisquam dicta eligendi dolore unde ducimus. Laudantium et incidunt dolor pariatur facilis vero molestiae possimus consequatur corporis quia.</p>
</section>
<section><span style={{color: 'green'}}>Vue</span> <span style={{color: 'rgb(218, 165, 32)'}}>.js</span>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, iusto! Error obcaecati, pariatur voluptates tempora natus dolore rerum ipsum nobis earum enim omnis excepturi minus, illum nemo explicabo nisi consequatur.</p>
</section>
<section> <span style={{color: 'blue'}}>React</span> <span style={{color: 'rgb(218, 165, 32)'}}>.js</span>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, earum iusto fugit minima animi illum soluta voluptatem atque officia placeat, ratione corporis eius consequatur alias impedit mollitia quos reprehenderit optio?</p>
</section>
<section>TypeScript
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid atque veniam, ipsam sapiente ducimus fugit itaque animi deserunt perspiciatis! Ipsum facere placeat quisquam. Voluptatem beatae, incidunt architecto earum tenetur perspiciatis.</p>
</section>
</div>



     </div>
        </>


    )
}



export default Kontakt;