import Card from "react-bootstrap/esm/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Paginate from "../../components/UI/Paginate";
import { useAuth } from "../../context/AuthContext";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyWishlistDetailsFn } from "../../features/Wishlist/api";
import { BsTrash, BsCartPlus } from "react-icons/bs";
import { useDeleteFromWishlist } from "../../features/Wishlist/useDeleteWishitem";
import IconButton from "../../components/UI/IconButton";
import { useCartData } from "../../context/CartContext";
import CustomSpinner from "../../components/UI/CustomSpinner";
import CustomAlert from "../../components/UI/Alert";

export default function Wishlist() {
  const { user } = useAuth();
  const { addItemToCart } = useCartData();
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
        return getMyWishlistDetailsFn(page);
      }
    },
    retry: 1,
    keepPreviousData: true,
  });

  const { deleteWishitem } = useDeleteFromWishlist();

  const handleDeleteWishItem = (mobileId) => {
    deleteWishitem(mobileId, {
      onSuccess: () => {
        queryClient.invalidateQueries("wislistitems");
      },
    });
  };

  const addToCart = (mobileId) => {
    const quantity = 1;
    addItemToCart(mobileId, quantity, () => handleDeleteWishItem(mobileId));
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
        <CustomSpinner />
      ) : wishlistItems?.data ? (
        wishlistItems?.data?.length > 0 ? (
          <>
            <Container className="row">
              <Container className="d-flex p-0 col-12 justify-content-around flex-wrap mb-4 flex-row gap-5 gap-xl-0">
                {wishlistItems.data.map((m) => (
                  <Card
                    key={m.id}
                    className="col-12 d-flex flex-column flex-sm-row gap-3 gap-sm-0 border-0 my-2"
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
                          <IconButton onClick={() => addToCart(m.mobileId)}>
                            <BsCartPlus
                              style={{ width: "18px", height: "18px" }}
                              color="gray"
                            />
                          </IconButton>
                        )}
                        <IconButton
                          onClick={() => handleDeleteWishItem(m.mobileId)}
                        >
                          <BsTrash
                            style={{ width: "18px", height: "18px" }}
                            color="red"
                          />
                        </IconButton>
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
          <CustomAlert variant="secondary" fromTop={5}>
            Your wishlist is empty!
          </CustomAlert>
        )
      ) : (
        isError && (
          <CustomAlert variant="danger">
            Something went wrong, please try again latter!
          </CustomAlert>
        )
      )}
    </Container>
  );
}
