const POST_IME_OSOBA = "Polje ime is required!";
const POST_PREZIME_OSOBA = "Polje prezime is required!";
const POST_BROJTELEFONA_OSOBA = "Polje brojtelefona is required!";
const POST_ADRESA_OSOBA = "Polje adresa is required!";
const POST_GRAD_OSOBA = "Polje grad is required!";
const POST_EMAIL_OSOBA = "Polje email is required!";
const POST_SPOL_OSOBA = "Polje spol is required!";
const POST_PASSWORD_KORISNIK = "Password is required!";
const POST_USERNAME_KORISNIK = "Polje username is required!";
const USER_ALREADY_EXISTS = value => `User with username ${value} already exists`;


module.exports ={
    POST_IME_OSOBA,
    POST_PREZIME_OSOBA, POST_BROJTELEFONA_OSOBA,
    POST_ADRESA_OSOBA, POST_GRAD_OSOBA,
    POST_EMAIL_OSOBA,
    POST_SPOL_OSOBA,
    USER_ALREADY_EXISTS,
    POST_PASSWORD_KORISNIK,
    POST_USERNAME_KORISNIK
}
