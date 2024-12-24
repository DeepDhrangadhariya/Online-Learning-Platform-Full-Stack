import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { captureAndFinalizePayemntService } from "@/services/services"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"




const PaypalPaymentReturnPage = () => {

    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')

    useEffect(() => {
        if (paymentId && payerId) {
            async function capturePayment() {
                const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))

                const response = await captureAndFinalizePayemntService(
                    paymentId,
                    payerId,
                    orderId
                )

                if (response.success) {
                    sessionStorage.removeItem('currentOrderId')
                    window.location.href = '/student-courses'
                }
            }

            capturePayment()
        }
    },[payerId, paymentId])

    // console.log(params)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Processing Payment... Please Wait</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PaypalPaymentReturnPage