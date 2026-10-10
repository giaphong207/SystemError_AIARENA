import * as THREE from 'three';
export default function AccessorySystem({ids=[]}){
    const hat=ids.find(x=>['khan-van','khan-xep','non-la','non-quai-thao','mo-qua'].includes(x));
    const sneaker=ids.includes('giay-the-thao'),wood=ids.includes('guoc-moc'),heels=ids.includes('giay-cao-got');
    return <group>
        {hat==='non-la'&&<group position={[0,1.72,0]}><mesh castShadow><coneGeometry args={[.255,.14,64,1,true]}/><meshStandardMaterial color="#D8C48D" side={THREE.DoubleSide}/></mesh><mesh position={[0,-.07,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.252,.006,8,64]}/><meshStandardMaterial color="#B19B6F"/></mesh></group>}
        {hat==='non-quai-thao'&&<group position={[0,1.70,0]}><mesh><cylinderGeometry args={[.27,.27,.045,64]}/><meshStandardMaterial color="#C7AE77"/></mesh>{[-1,1].map(s=><mesh key={s} position={[s*.19,-.15,.04]}><boxGeometry args={[.014,.3,.006]}/><meshStandardMaterial color="#703C49"/></mesh>)}</group>}
        {['khan-van','khan-xep'].includes(hat)&&<mesh position={[0,1.635,0]} rotation={[Math.PI/2,0,0]} scale={[1,1,.75]} castShadow><torusGeometry args={[.085,.03,16,64]}/><meshStandardMaterial color={hat==='khan-xep'?'#282E30':'#553B50'}/></mesh>}
        {hat==='mo-qua'&&<mesh position={[0,1.61,-.025]} scale={[.105,.1,.105]}><sphereGeometry args={[1,32,20,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#292A2C" side={THREE.DoubleSide}/></mesh>}
        {ids.includes('tui-xach')&&<group position={[-.34,.86,.09]}><mesh castShadow><boxGeometry args={[.14,.14,.06]}/><meshStandardMaterial color="#B89A6B" roughness={.95}/></mesh><mesh position={[0,.09,0]}><torusGeometry args={[.05,.006,8,40,Math.PI]}/><meshStandardMaterial color="#9A7A4D"/></mesh></group>}
        {ids.includes('kinh-ram')&&<group position={[0,1.565,.167]}>{[-1,1].map(s=><mesh key={s} position={[s*.036,0,0]}><boxGeometry args={[.05,.025,.008]}/><meshStandardMaterial color="#242D2C" roughness={.2}/></mesh>)}<mesh><boxGeometry args={[.025,.005,.008]}/><meshStandardMaterial color="#B89A63"/></mesh></group>}
        {[-1,1].map(s=><group key={s} position={[s*.082,.06,.094]}><mesh castShadow scale={[.065,.04,.11]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial color={sneaker?'#EDEAE2':wood?'#A1744E':'#2F3435'} roughness={.7}/></mesh>{sneaker&&<mesh position={[0,-.018,0]}><boxGeometry args={[.12,.025,.19]}/><meshStandardMaterial color="#FFFFFF"/></mesh>}{heels&&<mesh position={[0,-.015,-.065]}><cylinderGeometry args={[.012,.009,.06,12]}/><meshStandardMaterial color="#2F3435"/></mesh>}</group>)}
    </group>;
}
