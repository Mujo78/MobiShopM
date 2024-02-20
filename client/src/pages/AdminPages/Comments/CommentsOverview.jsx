import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useAuth } from "../../../context/AuthContext";
import { getAllCommentsFn, deleteCommentFn } from "../../../features/Admin/api";
import Spinner from "react-bootstrap/esm/Spinner";
import { useLocation, useNavigate } from "react-router-dom";

import { BsXLg } from "react-icons/bs";
import { formatDate } from "../../../util";
import { toast } from "react-toastify";
import Paginate from "../../../components/Paginate";

export default function CommentsOverview() {
  const { user } = useAuth();
  const query = useQueryParams();
  const page = parseInt(query.get("page")) || 1;
  const queryClient = useQueryClient();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const {
    data: comments,
    isFetching,
    isError,
    isPreviousData,
  } = useQuery({
    queryKey: ["comments", page],
    queryFn: () => {
      const token = user.token;
      return getAllCommentsFn(token, page);
    },
    keepPreviousData: true,
  });

  const { mutate } = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: async (id) => {
      const token = user.token;
      await deleteCommentFn(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      toast.success("Sucessfully deleted comment!");
    },
    onError: () => {
      toast.error("Something went wrong, please try again latter!");
    },
  });

  const handleNavigate = (page) => {
    navigate(`${location}?page=${page}`);
  };

  const replyComment = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const deleteComment = (event, id) => {
    event.stopPropagation();
    mutate(id);
  };

  return (
    <Container fluid className="overflow-y-hidden w-100">
      <h3>Comments</h3>
      {isFetching ? (
        <div className="w-100 d-flex justify-content-center align-items-center mt-4">
          <Spinner />
        </div>
      ) : comments?.data.length > 0 ? (
        <Container
          fluid
          id="content"
          className="overflow-y-scroll row pb-5 pb-sm-0 p-0 mt-2 d-flex flex-column justify-content-between"
        >
          <Container className="d-flex flex-column gap-3 pb-5 pb-sm-3 col-12">
            {comments.data.map((m) => (
              <Card
                key={m.id}
                className="custom-card col-12"
                onClick={() => replyComment(m.email)}
              >
                <Card.Body>
                  <Card.Title>
                    {m.name},
                    <span style={{ fontSize: "0.9rem" }} className="ms-1">
                      {formatDate(m.createdAt)}
                    </span>
                  </Card.Title>
                  <hr />
                  <Card.Text style={{ fontSize: "0.9rem" }}>
                    {m.comment}
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="danger"
                  onClick={(event) => deleteComment(event, m.id)}
                  className=" position-absolute py-1 px-2"
                  style={{ top: "3px", right: "3px" }}
                >
                  <BsXLg color="white" />
                </Button>
              </Card>
            ))}
          </Container>

          <Container className="d-flex justify-content-center pb-3 mt-auto">
            <Paginate
              numOfPages={comments.numOfPages}
              currentPage={comments.currentPage}
              handleNavigate={handleNavigate}
              isPreviousData={isPreviousData}
            />
          </Container>
        </Container>
      ) : isError ? (
        <Alert variant="danger">
          Something went wrong, please try again latter!
        </Alert>
      ) : (
        comments?.data.length === 0 && (
          <Alert variant="secondary" className="text-center">
            There are no comments.
          </Alert>
        )
      )}
    </Container>
  );
}