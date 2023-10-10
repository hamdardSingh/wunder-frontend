export interface FormState {
    step: number
    formfields: FormFields
}

export type FormFields = {
    personal: {
        firstname: string
        lastname: string
        phone: string
    }
    address: {
        street: string
        number: string
        zip: string
        city: string
    }
    payment: {
        name: string
        iban: string
    }
}

