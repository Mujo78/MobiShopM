import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { toast } from "react-toastify";
import ErrorFinder from "../../components/ErrorFinder";
import useResponsive from "../../components/useResponsive";

const CustomFromGroup = styled(Form.Group)`
  label {
    color: #C0C0C0;
    font-size: 12px;
  }
`;

export default function ChangePassword(){

    const {authState} = useContext(AuthContext);
    const {isMobile} = useResponsive();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [errorState, setErrorState] = useState([]);
    const [passwords, setPasswords] = useState({
        password:"",
        newPassword:"",
        confirmPassword:""
    })

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(n => !n);
    };
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(m => !m);
      };

    const showHideImageOld = !showOldPassword ? "/images/see.svg" : "/images/hide.svg";
    const showHideImageNew = !showNewPassword ? "/images/see.svg" : "/images/hide.svg";

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setPasswords(n => ({
            ...n,
            [name] : value

        }))
    }

    const changePassword = (event) =>{
        event.preventDefault();

        axios.put(`http://localhost:3001/change-password/${authState.id}`, passwords, {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(() =>{
            setPasswords({
                password:"",
                newPassword:"",
                confirmPassword:""
            });
            setErrorState([]);
            toast.success("Password successfully changed!");
        })
        .catch(error => setErrorState(error.response.data.errors))
    }

    let num = errorState.length;

    return(
        <Container className="mt-3">
            <h3>Password change</h3>
            <Form className="mb-5" onSubmit={changePassword}>
            <CustomFromGroup className="mb-3">
                <div className="mb-3">
                    <Form.Label>Old password</Form.Label>
                    <div className="input-group">
                        <Form.Control
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Old password"
                        value={passwords.password}
                        onChange={handleChange}
                        name="password"
                        />
                            <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={toggleOldPasswordVisibility}
                            >
                                <img style={{height:"20px"}} src={showHideImageOld} alt="seehide" />
                            </button>
                    </div>
                    {num > 0 && <ErrorFinder err={errorState} fieldName="password" />}
                </div>
                <div className="mb-3">
                    <Form.Label>New password</Form.Label>
                    <div className="input-group">
                        <Form.Control
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New password"
                        onChange={handleChange}
                        value={passwords.newPassword}
                        name="newPassword"
                        />
                            <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={toggleNewPasswordVisibility}
                            >
                                <img style={{height:"20px"}} src={showHideImageNew} alt="seehide" />
                            </button>
                    </div>
                    {num > 0 && <ErrorFinder err={errorState} fieldName="newPassword" />}
                </div>
                <div>
                    <Form.Label>Confirm new password</Form.Label>
                        <Form.Control
                        type="password"
                        onChange={handleChange}
                        value={passwords.confirmPassword}
                        placeholder="New password"
                        name="confirmPassword" />
                         {num > 0 && <ErrorFinder err={errorState} fieldName="confirmPassword" />}
                </div>
            </CustomFromGroup>
                <Button style={{backgroundColor:"#219aeb", border: "none", borderRadius: 0}} type="submit" className={isMobile ? "w-100" : "w-25"}>
                    Save changes
                </Button>
            </Form>
        </Container>
    )
}