export const createOrderOnline = (
    shippingInfo,
    paymentMethod,
    orderItems, 
    itemsPrice,
    taxPrice, 
    shippingCharges,
    totalAmount,
) => async (dispatch) => {

    try {

        dispatch({
            type: "placeOrderRequest",
        });

        const {data} = await axios.post(`${server}/createorder`, {
            shippingInfo,
            paymentMethod,
            orderItems,
            itemsPrice,
            taxPrice, 
            shippingCharges,
            totalAmount,
        } , {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        const options = {
            key: "rzp_test_SIntskbOo4jlGn",
            amount: totalAmount,
            currency: "INR",
            name: "APP NAME",
            description: "-----",
            image: <img>,
            order_id: data.order.id,

            handler: function (response){
                const {razorpay_order_id , razorpay_payment_id , razorpay_signature} = response;

                dispatch(paymentVerification(razorpay_order_id , razorpay_payment_id , razorpay_signature , data.orderOptions))
            },

            theme: {
                color: "#9c003c",
            }
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();

        dispatch({
            type: "placeOrderSuccess",
            payload: data.message,
        });
    } catch (error) {

        dispatch({
            type: "placeOrderFail",
            payload: error.response.data.message,
        });
    }
};