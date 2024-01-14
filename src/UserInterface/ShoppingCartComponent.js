import React, { useState, useEffect } from "react";
import { Button, Avatar } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { ShoppingCartOutlined } from '@mui/icons-material';
const useStyles = makeStyles({
    root: {
        background: '#ecf0f1',
    },
})

export default function ShoppingCartComponent(props) {
    const classes = useStyles(props);
    const [value, setvalue] = useState(props.value);
    const handleAdd = () => {
        var c = value + 1
        setvalue(c)
        props.onChange(c)
    }
    const handleMinus = () => {
        var c = value - 1
        if (c >= 0) {
            setvalue(c)
            props.onChange(c)
        }

    }
    const handleClick = () => {
        var c = value + 1
        setvalue(c)
        props.onChange(c)
    }
    return (<div>
        {value == 0 ? <div>
            <Button  variant="contained" onClick={() => handleClick()} sx={{ width: 200, bgcolor: '#000', color: '#fff' }} variant="contained" endIcon={<ShoppingCartOutlined />}>
            Add to Cart
        </Button></div> :
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Avatar onClick={() => handleMinus()} sx={{ bgcolor: 'black', color: '#fff', fontSize: 24, fontWeight: 'bold', margin: 2 }} variant="square">
                    -
                </Avatar>
                <div sx={{ display: 'flex', fontSize: 24, fontWeight: 'bold' }}>{value}</div>

                <Avatar onClick={() => handleAdd()} sx={{ bgcolor: 'black', color: '#fff', fontSize: 24, fontWeight: 'bold', margin: 2 }} variant="square">
                    +
                </Avatar>

            </div>}
    </div>
    )
}