import Card from "react-bootstrap/esm/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Paginate from "../../components/UI/Paginate";
import { useAuth } from "../../context/AuthContext";
import Alert from "react-bootstrap/Alert";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyWishlistDetailsFn } from "../../features/Wishlist/api";
import Spinner from "react-bootstrap/esm/Spinner";
import { BsTrash, BsCartPlus } from "react-icons/bs";
import { useDeleteFromWishlist } from "../../features/Wishlist/useDeleteWishitem";
import { useAddToCart } from "../../features/Cart/useAddToCart";

export default function Wishlist() {
  const { user } = useAuth();
  const query = useQueryParams();
  const page = parseInt(query.get("page")) || 1;
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const queryClient = useQueryClient();

  const {
    data: wishlistItems,
    isFetching,
    isError,
    isPreviousData,
  } = useQuery({
    queryKey: ["wishlistitems", page],
    queryFn: () => {
      if (user.role === 2) {
        const token = user.token;
        return getMyWishlistDetailsFn(token, page);
      }
    },
    keepPreviousData: true,
  });

  const { deleteWishitem } = useDeleteFromWishlist();
  const { mutate } = useAddToCart();

  const handleDeleteWishItem = (mobileId) => {
    deleteWishitem(mobileId, {
      onSuccess: () => {
        queryClient.invalidateQueries("wislistitems");
      },
    });
  };

  const addToCart = (mobileId) => {
    mutate(
      { mobileId, quantity: 1 },
      {
        onSuccess: () => {
          handleDeleteWishItem(mobileId);
        },
      }
    );
  };

  const handleNavigate = (page) => {
    navigate(`${location}?page=${page}`);
  };

  const handleSeeMoreAboutPhone = (mobileId, mobileName) => {
    navigate(`/mobile/${mobileId}/${mobileName}`);
  };

  return (
    <Container className="p-0 row mt-4 w-100">
      <h3>Wishlist</h3>
      {isFetching ? (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : wishlistItems.data ? (
        wishlistItems.data.length > 0 ? (
          <>
            <Container className="row">
              <Container className="d-flex p-0 col-12 justify-content-around flex-wrap mb-4 flex-row gap-4 gap-xl-0">
                {wishlistItems.data.map((m) => (
                  <Card
                    key={m.id}
                    className="col-12 d-flex flex-column flex-sm-row gap-3 gap-sm-0 border-0"
                    style={{ maxWidth: "25rem" }}
                  >
                    <Card.Img
                      onClick={() =>
                        handleSeeMoreAboutPhone(
                          m.mobileId,
                          m.Mobile.mobile_name
                        )
                      }
                      src={m.Mobile.photo}
                      className="mobile-img-class h-auto wishlist-card-img"
                    />

                    <Card.Body className="d-flex flex-column px-0 col-12">
                      <Container className="col-12">
                        <h6>{m.Mobile.mobile_name}</h6>
                        <p style={{ fontSize: "0.9rem" }} className="">
                          {m.Mobile.internal + "/" + m.Mobile.ram + " GB"}
                        </p>
                        <p className="text-danger fw-bold">
                          {m.Mobile.price + " BAM "}
                        </p>
                      </Container>
                      <Container className="d-flex col-12 justify-content-center gap-3">
                        {m.Mobile.quantity > 0 && (
                          <Button
                            className="m-0 border-0 bg-white wishlist-icon-btn"
                            onClick={() => addToCart(m.mobileId)}
                          >
                            <BsCartPlus
                              style={{ width: "24px", height: "24px" }}
                              color="gray"
                            />
                          </Button>
                        )}
                        <Button
                          className="border-0 bg-white wishlist-icon-btn"
                          onClick={() => handleDeleteWishItem(m.mobileId)}
                        >
                          <BsTrash
                            style={{ width: "24px", height: "24px" }}
                            color="red"
                          />
                        </Button>
                      </Container>
                    </Card.Body>
                  </Card>
                ))}
              </Container>
            </Container>
            <Container className="row">
              <Container className="col-12 d-flex justify-content-center align-items-center">
                <Paginate
                  numOfPages={wishlistItems.numOfPages}
                  currentPage={wishlistItems.currentPage}
                  handleNavigate={handleNavigate}
                  isPreviousData={isPreviousData}
                />
              </Container>
            </Container>
          </>
        ) : (
          <Alert variant="secondary" className="mt-5">
            Your wishlist is empty!
          </Alert>
        )
      ) : (
        isError && (
          <Alert variant="danger">
            Something went wrong, please try again latter!
          </Alert>
        )
      )}
    </Container>
  );
}
