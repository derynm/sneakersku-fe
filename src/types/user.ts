export interface Address {
    id: number,
    label: string,
    is_primary: boolean,
    street: string
}

export interface InputAddress {
    street: string,
    phone: string,
    label: string,
    is_primary: boolean
}

export interface User {
    id: string,
    email: string,
    name: string,
    role: "USER" | "ADMIN",
    createdAt: string,
    updatedAt: string,
    addresses: Address[]
}