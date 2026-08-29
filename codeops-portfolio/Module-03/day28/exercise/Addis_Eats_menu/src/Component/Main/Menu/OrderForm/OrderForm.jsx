import { useState } from 'react'
import './OrderForm.css'

/
const TELEBIRR_REGEX = /^(07|09|)\d{8}$/

function OrderForm() {
    const [form, setForm] = useState({ name: "", phone: "", area: "" })

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const isPhoneValid = TELEBIRR_REGEX.test(form.phone)
    const isFormValid =
        form.name.trim() !== "" &&
        form.area.trim() !== "" &&
        isPhoneValid

    function handleSubmit(e) {
        e.preventDefault()
        if (!isFormValid) return
        console.log("Order submitted:", form)
    }

    return (
        <form className="order-form" onSubmit={handleSubmit}>
            <h4>Delivery details</h4>

            <label>
                Name
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </label>

            <label>
                TeleBirr phone
                <input
                    type="tel"
                    name="phone"
                    placeholder="09XXXXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                />
                {form.phone !== "" && !isPhoneValid && (
                    <span className="field-error">
                        Enter a valid TeleBirr number, e.g. 0912345678
                    </span>
                )}
            </label>

            <label>
                Delivery area
                <input
                    type="text"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                />
            </label>

            <button type="submit" disabled={!isFormValid}>
                Place order
            </button>
        </form>
    )
}

export default OrderForm
