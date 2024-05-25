import React,{useEffect} from 'react';
import { useDencrypt} from 'use-dencrypt-effect';


const Dencrypt = () => {

    const values = ['Add Your Note', 'Paste Your Note','Share your Note'];
    const {result, dencrypt } = useDencrypt();

    useEffect(() => {
        let i=0;
        const action = setInterval(()=>{
            dencrypt(values[i]);
            i = i === values.length - 1 ? 0 : i + 1;
        },4000);

        //cleanUP
        return () => clearImmediate(action);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="display-4 text-center">
            {result}
        </div>
    )
}

export default Dencrypt
