type User = {
    UserAvatar: string
    aud: string
    email: string
    exp: number
    iat: number
    iss: string
    nameid: string
    nbf: number
    unique_name: string
}
type property = {
    id: number
    address: string;
    location: string;
    rentPerMonth: number;
    contractDate: string;
    spaceNumber: string;
    status: boolean;
    available: boolean;
    addedDate: string;
}