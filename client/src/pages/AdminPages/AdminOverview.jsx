import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { deleteAdminFn, getAllAdmins } from "../../features/Admin/api";
import Spinner from "react-bootstrap/esm/Spinner";
import Table from "react-bootstrap/esm/Table";
import { toast } from "react-toastify";

export default function AdminOverview() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isError, isFetching } = useQuery({
    queryKey: ["admins"],
    queryFn: () => {
      const token = user.token;
      return getAllAdmins(token);
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["adminDelete"],
    mutationFn: async (id) => {
      const token = user.token;
      await deleteAdminFn(token, id);
    },
    onSuccess: () => {
      toast.success("Admin successfully deleted!");
      queryClient.invalidateQueries("admins");
    },
    onError: () => {
      toast.error("There was an error, please try again latter!");
    },
  });

  const deleteAdmin = (id) => {
    mutate(id);
  };

  return (
    <>
      {isFetching ? (
        <div className="d-flex w-100 mt-4 justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : (
        <Container className="d-flex flex-wrap justify-content-center mt-4">
          {data ? (
            <Table striped hover size="sm" className="text-center">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((m) => (
                  <tr key={m.id} className="align-middle">
                    <td>{m.id}.</td>
                    <td>{m.Person.first_name}</td>
                    <td>{m.Person.last_name}</td>
                    <td>{m.username}</td>
                    <td>
                      <Button
                        onClick={() => deleteAdmin(m.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            isError && (
              <Alert variant="danger">
                There was an error, please try again latter
              </Alert>
            )
          )}
        </Container>
      )}
    </>
  );
}
