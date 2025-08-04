import React, { useEffect } from "react";
import HeaderComponent from "./wrap/HeaderComponent";
import MainComponent from "./wrap/MainComponent";
import Sub01NewProduct from "./wrap/sub/Sub01NewProduct/Sub01NewProduct";
import Sub02BestProduct from "./wrap/sub/Sub02BestProduct/Sub02BestProduct";
import Sub03FleaMarket from "./wrap/sub/Sub03FleaMarket/Sub03FleaMarket";
import Sub04SpecialOffer from "./wrap/sub/Sub04SpecialOffer/Sub04SpecialOffer";
import Sub05ProductDetail from "./wrap/sub/Sub05ProductDetail/Sub05ProductDetail";
import Sub06Cart from "./wrap/sub/Sub06Cart/Sub06Cart";
import Sub07Order from "./wrap/sub/Sub07Order/Sub07Order";
import Sub08Payment from "./wrap/sub/Sub08Payment/Sub08Payment";
import Sub15FAQ from "./wrap/sub/Sub15FAQ/Sub15FAQ";
import Sub09Delivery from "./wrap/sub/Sub09Delivery/Sub09Delivery";
import Sub09DeliveryList from "./wrap/sub/Sub09Delivery/Sub09DeliveryList";
import Sub09DeliveryWrite from "./wrap/sub/Sub09Delivery/Sub09DeliveryWrite";
import Sub10SignUpAdminDelete from "./wrap/sub/Sub10SignUpAdmin/Sub10SignUpAdminDelete";
import Sub10SignUpUpdate from "./wrap/sub/Sub10SignUp/Sub10SignUpUpdate";
import Sub10SignUpWrite from "./wrap/sub/Sub10SignUp/Sub10SignUpWrite";
import Sub10SignUpDelete from "./wrap/sub/Sub10SignUp/Sub10SignUpDelete";
import Sub10SignUpList from "./wrap/sub/Sub10SignUp/Sub10SignUpList";
import Sub10SignUpAdminList from "./wrap/sub/Sub10SignUpAdmin/Sub10SignUpAdminList";
import Sub10SignUpAdminUpdate from "./wrap/sub/Sub10SignUpAdmin/Sub10SignUpAdminUpdate";
import Sub10SignUpAdminWrite from "./wrap/sub/Sub10SignUpAdmin/Sub10SignUpAdminWrite";
import Sub11signInForm from "./wrap/sub/Sub11Signin/Sub11signInForm";
import Sub11signinIDSerachResult from "./wrap/sub/Sub11Signin/Sub11signinIDSerachResult";
import Sub11signinPWSerach from "./wrap/sub/Sub11Signin/Sub11signinPWSerach";
import Sub11signinPWSerachResult from "./wrap/sub/Sub11Signin/Sub11signinPWSerachResult";
import Sub11signInAdminForm from "./wrap/sub/Sub11SigninAdmin/Sub11signInAdminForm";
import Sub11signinAdminIDSerach from "./wrap/sub/Sub11SigninAdmin/Sub11signinAdminIDSerach";
import Sub11signinAdminIDSerachResult from "./wrap/sub/Sub11SigninAdmin/Sub11signinAdminIDSerachResult";
import Sub11signinAdminPWSerach from "./wrap/sub/Sub11SigninAdmin/Sub11signinAdminPWSerach";
import Sub11signinAdminPWSerachResult from "./wrap/sub/Sub11SigninAdmin/Sub11signinAdminPWSerachResult";
import Sub12NoticeBoardDelete from "./wrap/sub/Sub12NoticeBoard/Sub12NoticeBoardDelete";
import Sub12NoticeBoardList from "./wrap/sub/Sub12NoticeBoard/Sub12NoticeBoardList";
import Sub12NoticeBoardUpdate from "./wrap/sub/Sub12NoticeBoard/Sub12NoticeBoardUpdate";
import Sub12NoticeBoardWrite from "./wrap/sub/Sub12NoticeBoard/Sub12NoticeBoardWrite";
import Sub13NewsBoardDelete from "./wrap/sub/Sub13NewsBoard/Sub13NewsBoardDelete";
import Sub13NewsBoardList from "./wrap/sub/Sub13NewsBoard/Sub13NewsBoardList";
import Sub13NewsBoardUpdate from "./wrap/sub/Sub13NewsBoard/Sub13NewsBoardUpdate";
import Sub13NewsBoardWrite from "./wrap/sub/Sub13NewsBoard/Sub13NewsBoardWrite";
import Sub14InqueryBoardDelete from "./wrap/sub/Sub14InqueryBoard/Sub14InqueryBoardDelete";
import Sub14InqueryBoardList from "./wrap/sub/Sub14InqueryBoard/Sub14InqueryBoardList";
import Sub14InqueryBoardUpdate from "./wrap/sub/Sub14InqueryBoard/Sub14InqueryBoardUpdate";
import Sub14InqueryBoardWrite from "./wrap/sub/Sub14InqueryBoard/Sub14InqueryBoardWrite";
import FooterComponent from "./wrap/FooterComponent";
import GoTopComponent from "./wrap/GoTopComponent";
import NotPageComponent from "./wrap/NotPageComponent";
import WishlistComponent from "./wrap/sub/Sub16Wishlist/WishlistComponent";
import MainModalComponent from "./wrap/MainModalComponent";
import ConfirmModal from "./wrap/ConfirmModal";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAddAction } from "../store/viewProduct";
import { heartAddAction } from "../store/wishlist";
import { mainModalAction } from "../store/mainModal";
import { useCookies } from "react-cookie";
import { cartAddAction } from "../store/cart";

export default function WrapComponent(props) {
  const dispatch = useDispatch();
  const confirmIsOn = useSelector((state) => state.confirmModal.isOn);
  const mainIsOn = useSelector((state) => state.mainModal.isOn);
  const [cookies, setCookie] = useCookies();

  /**모달 쿠키 관리 */
  useEffect(() => {
    const cookie_data = [
      {
        key: "HONGO_MAIN_MODAL",
        value: "main_modal_close_1day",
        action: mainModalAction,
        state: {
          imgSrc: "popup-subscribe.webp",
          isOn: true,
        },
      },
    ];
    try {
      cookie_data.forEach(({ key, value, action, state }) => {
        const res =
          cookies[key] === value
            ? {
                imgSrc: state.imgSrc,
                isOn: false,
              }
            : {
                imgSrc: state.imgSrc,
                isOn: true,
              };
        dispatch(action(res));
      });
    } catch (error) {
      console.log(error);
      alert("cookie ERROR");
    }
  }, []);

  useEffect(() => {
    const local = [
      { key: "latest", action: productAddAction },
      { key: "wishlist", action: heartAddAction },
      { key: "cart", action: cartAddAction },
    ];
    try {
      local.forEach(({ key, action }) => {
        const data = localStorage.getItem(key);
        if (data) {
          dispatch(action(JSON.parse(data)));
        }
      });
      /**장바구니 관리 */
    } catch (error) {
      console.log(error);
      alert("error!");
      return;
    }
  }, []);
  return (
    <div id="wrap">
      <Routes>
        <Route path="/" element={<HeaderComponent />}>
          <Route index element={<MainComponent />} />
          <Route path="/mainComponent" element={<MainComponent />} />
          <Route path="/sub01NewProduct" element={<Sub01NewProduct />} />
          <Route path="/sub02BestProduct" element={<Sub02BestProduct />} />
          <Route path="/sub03FleaMarket" element={<Sub03FleaMarket />} />
          <Route path="/sub04SpecialOffer" element={<Sub04SpecialOffer />} />
          <Route path="/sub05ProductDetail" element={<Sub05ProductDetail />} />
          <Route path="/sub06Cart" element={<Sub06Cart />} />
          <Route path="/sub07Order" element={<Sub07Order />} />
          <Route path="/sub08Payment" element={<Sub08Payment />} />
          <Route path="/sub09Delivery" element={<Sub09Delivery />} />
          <Route path="/sub09DeliveryWrite" element={<Sub09DeliveryWrite />} />
          <Route path="/sub09DeliveryList" element={<Sub09DeliveryList />} />
          <Route path="/sub10SignUpWrite" element={<Sub10SignUpWrite />} />
          <Route path="/sub10SignUpUpdate" element={<Sub10SignUpUpdate />} />
          <Route path="/sub10SignUpDelete" element={<Sub10SignUpDelete />} />
          <Route path="/sub10SignUpList" element={<Sub10SignUpList />} />
          <Route
            path="/sub10SignUpAdminDelete"
            element={<Sub10SignUpAdminDelete />}
          />
          <Route
            path="/sub10SignUpAdminDelete"
            element={<Sub10SignUpAdminDelete />}
          />
          <Route
            path="/sub10SignUpAdminList"
            element={<Sub10SignUpAdminList />}
          />
          <Route
            path="/sub10SignUpAdminUpdate"
            element={<Sub10SignUpAdminUpdate />}
          />
          <Route
            path="/sub10SignUpAdminWrite"
            element={<Sub10SignUpAdminWrite />}
          />

          <Route path="/sub11signInForm" element={<Sub11signInForm />} />
          <Route
            path="/sub11signinIDSerachResult"
            element={<Sub11signinIDSerachResult />}
          />
          <Route
            path="/sub11signinPWSerach"
            element={<Sub11signinPWSerach />}
          />
          <Route
            path="/sub11signinPWSerachResult"
            element={<Sub11signinPWSerachResult />}
          />
          <Route
            path="/sub11signInAdminForm"
            element={<Sub11signInAdminForm />}
          />
          <Route
            path="/sub11signinAdminIDSerach"
            element={<Sub11signinAdminIDSerach />}
          />
          <Route
            path="/sub11signinAdminIDSerachResult"
            element={<Sub11signinAdminIDSerachResult />}
          />
          <Route
            path="/sub11signinAdminPWSerach"
            element={<Sub11signinAdminPWSerach />}
          />
          <Route
            path="/sub11signinAdminPWSerachResult"
            element={<Sub11signinAdminPWSerachResult />}
          />

          <Route
            path="/sub12NoticeBoardDelete"
            element={<Sub12NoticeBoardDelete />}
          />
          <Route
            path="/sub12NoticeBoardList"
            element={<Sub12NoticeBoardList />}
          />
          <Route
            path="/sub12NoticeBoardUpdate"
            element={<Sub12NoticeBoardUpdate />}
          />
          <Route
            path="/sub12NoticeBoardWrite"
            element={<Sub12NoticeBoardWrite />}
          />

          <Route
            path="/sub13NewsBoardDelete"
            element={<Sub13NewsBoardDelete />}
          />
          <Route path="/sub13NewsBoardList" element={<Sub13NewsBoardList />} />
          <Route
            path="/sub13NewsBoardUpdate"
            element={<Sub13NewsBoardUpdate />}
          />
          <Route
            path="/sub13NewsBoardWrite"
            element={<Sub13NewsBoardWrite />}
          />
          <Route
            path="/sub14InqueryBoardDelete"
            element={<Sub14InqueryBoardDelete />}
          />
          <Route
            path="/sub14InqueryBoardList"
            element={<Sub14InqueryBoardList />}
          />
          <Route
            path="/sub14InqueryBoardUpdate"
            element={<Sub14InqueryBoardUpdate />}
          />
          <Route
            path="/sub14InqueryBoardWrite"
            element={<Sub14InqueryBoardWrite />}
          />
          <Route path="/sub15FAQ" element={<Sub15FAQ />} />
          <Route path="/*" element={<NotPageComponent />} />
          <Route path="/subWishList" element={<WishlistComponent />} />
        </Route>
      </Routes>
      <FooterComponent />
      <GoTopComponent />
      {confirmIsOn && <ConfirmModal />}
      {mainIsOn && <MainModalComponent />}
    </div>
  );
}
