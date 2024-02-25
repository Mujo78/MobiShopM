import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { deleteAdminFn, getAllAdmins } from "../../../features/Admin/api";
import Table from "react-bootstrap/esm/Table";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Paginate from "../../../components/UI/Paginate";
import { useQueryParams } from "../../../hooks/useQueryParams";
import CustomSpinner from "../../../components/UI/CustomSpinner";
import CustomAlert from "../../../components/UI/Alert";

export default function AdminOverview() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const query = useQueryParams();
  const page = parseInt(query.get("page")) || 1;
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const {
    data: admins,
    isError,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["admins", page],
    queryFn: () => {
      const token = user.token;
      return getAllAdmins(token, page);
    },
    keepPreviousData: true,
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

  const handleNavigate = (page) => {
    navigate(`${location}?page=${page}`);
  };

  return (
    <>
      {isFetching ? (
        <CustomSpinner />
      ) : (
        <Container className="d-flex flex-wrap justify-content-center mt-4">
          {admins?.data.length > 0 ? (
            <Container>
              <Table striped hover size="sm" className="text-center">
                <thead>
                  <tr>
                    <th className="d-none d-lg-table-cell">No.</th>
                    <th className="d-none d-lg-table-cell">First Name</th>
                    <th className="d-none d-lg-table-cell">Last Name</th>
                    <th>Username</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {admins.data.map((m) => (
                    <tr key={m.id} className="align-middle">
                      <td className="d-none d-lg-table-cell">{m.id}.</td>
                      <td className="d-none d-lg-table-cell">
                        {m.Person.first_name}
                      </td>
                      <td className="d-none d-lg-table-cell">
                        {m.Person.last_name}
                      </td>
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

              <Container className="d-flex justify-content-center pb-3 mt-auto">
                <Paginate
                  numOfPages={admins.numOfPages}
                  currentPage={admins.currentPage}
                  handleNavigate={handleNavigate}
                  isPreviousData={isPreviousData}
                />
              </Container>
            </Container>
          ) : isError ? (
            <CustomAlert variant="danger">
              There was an error, please try again latter
            </CustomAlert>
          ) : (
            admins?.data.length === 0 && (
              <CustomAlert variant="secondary">
                There are no admins.
              </CustomAlert>
            )
          )}
        </Container>
      )}
    </>
  );
}
