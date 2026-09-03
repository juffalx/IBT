import { useState } from 'react'
import './OrderForm.css'

function OrderForm(){
    const [form, setForm] = useState({ name: "", phone: "", area: "Bole" })

    function handleChange(e){
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const valid = /^(?:\+251|0)9\d{8}$/.test(form.phone)

    function handleSubmit(e){
        e.preventDefault()
        alert("Order placed for " + form.name)
    }

    return (
        <form className="order-form" onSubmit={handleSubmit}>
            <h3>Delivery details</h3>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="09... or +2519..." />
            <select name="area" value={form.area} onChange={handleChange}>
                <option value="Bole">Bole</option>
                <option value="Piassa">Piassa</option>
                <option value="Kazanchis">Kazanchis</option>
            </select>
            {form.phone && !valid && <p className="err">Use 09... or +2519...</p>}
            <button disabled={!valid}>Pay with TeleBirr</button>
        </form>
    )
}

export default OrderForm
