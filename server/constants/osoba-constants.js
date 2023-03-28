const POST_IME_OSOBA = "Field name is required!";
const POST_PREZIME_OSOBA = "Field last name is required!";
const POST_BROJTELEFONA_OSOBA = "Field phone number is required!";
const POST_ADRESA_OSOBA = "Field address is required!";
const POST_GRAD_OSOBA = "Field city is required!";
const POST_EMAIL_OSOBA = "Field email is required!";
const POST_SPOL_OSOBA = "Field gender is required!";
const POST_PASSWORD_KORISNIK = "Password is required!";
const POST_USERNAME_KORISNIK = "Username is required!";
const POST_LETTERINPHONE_OSOBA = "Phone number must contain only digits!";
const USER_ALREADY_EXISTS = value => `User with username ${value} already exists`;


module.exports ={
    POST_IME_OSOBA,
    POST_PREZIME_OSOBA, POST_BROJTELEFONA_OSOBA,
    POST_ADRESA_OSOBA, POST_GRAD_OSOBA,
    POST_EMAIL_OSOBA,
    POST_SPOL_OSOBA,
    USER_ALREADY_EXISTS,
    POST_PASSWORD_KORISNIK,
    POST_USERNAME_KORISNIK,
    POST_LETTERINPHONE_OSOBA
}
