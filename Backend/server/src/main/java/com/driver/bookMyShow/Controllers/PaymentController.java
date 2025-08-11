package com.driver.bookMyShow.Controllers;



import com.driver.bookMyShow.Services.BookingService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import org.apache.commons.codec.digest.HmacUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;
//
//@RestController
//@RequestMapping("/payment")
//public class PaymentController {
//
//    @Value("${rzp_key_id}")
//    private String razorpayKeyId;
//
//    @Value("${rzp_key_secret}")
//    private String razorpayKeySecret;
//
//    @Value("${rzp_currency}")
//    private String razorpayCurrency;
//
//    @GetMapping("/createOrderId/{amount}")
//    public ResponseEntity<String> createOrderId(@PathVariable String amount) {
//        try {
//            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
//
//            JSONObject orderRequest = new JSONObject();
//            orderRequest.put("amount", Integer.parseInt(amount) * 100); // amount in paise
//            orderRequest.put("currency", razorpayCurrency);
//            orderRequest.put("receipt", "txn_" + UUID.randomUUID());
//
//            Order order = razorpay.orders.create(orderRequest);
//            return ResponseEntity.ok(order.get("id"));
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error: " + e.getMessage());
//        }
//    }
//    
//    @Value("${rzp_key_secret}")
//    private String secretKey;
//
//    
//    @CrossOrigin(origins = "http://localhost:5173")
//    @PostMapping("/payment/verify")
//    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> payload) {
//        String orderId = payload.get("razorpay_order_id");
//        String paymentId = payload.get("razorpay_payment_id");
//        String signature = payload.get("razorpay_signature");
//
//        String generatedSignature = HmacUtils.hmacSha256Hex(secretKey, orderId + "|" + paymentId);
//
//        if (generatedSignature.equals(signature)) {
//            // Save to DB or mark booking as paid
//            return ResponseEntity.ok("Payment verified");
//        } else {
//            return ResponseEntity.status(400).body("Invalid signature");
//        }
//    }
//
//}


@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Value("${rzp_key_id}")
    private String razorpayKeyId;

    @Value("${rzp_key_secret}")
    private String razorpayKeySecret;

    @Value("${rzp_currency}")
    private String razorpayCurrency;

    @Autowired
    private BookingService bookingService;

    @GetMapping("/createOrderId/{amount}")
    public ResponseEntity<String> createOrderId(@PathVariable String amount) {
        try {
            RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", Integer.parseInt(amount) * 100);
            orderRequest.put("currency", razorpayCurrency);
            orderRequest.put("receipt", "txn_" + UUID.randomUUID());

            Order order = razorpay.orders.create(orderRequest);
            return ResponseEntity.ok(order.get("id"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> payload) {
        String orderId = payload.get("razorpay_order_id");
        String paymentId = payload.get("razorpay_payment_id");
        String signature = payload.get("razorpay_signature");

        String generatedSignature = HmacUtils.hmacSha256Hex(razorpayKeySecret, orderId + "|" + paymentId);

        if (generatedSignature.equals(signature)) {
            bookingService.markBookingAsPaid(orderId, paymentId); // optional
            return ResponseEntity.ok("Payment verified");
        } else {
            System.out.println("Signature mismatch:");
            System.out.println("Expected: " + generatedSignature);
            System.out.println("Received: " + signature);
            return ResponseEntity.status(400).body("Invalid signature");
        }
    }
}
