import { number } from "framer-motion";
import api from "../axios/axios.js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    //check if it is
    if (otp.length != 6) {
      setError("Invalid code");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/auth/verify_otp", { email, otp });
      alert(data.message);
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
      setIsLoading(false);
      console.log("OTP Verification error", err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="container mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white/40 backdrop-blur-2xl p-8 md:p-12
          rounded-[3rem] border border-primary/10 shadow-2xl shadow-primary/5
          text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/5 mb-8">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>

          <h2 className="font-display text-3xl font-bold mb-3">
            Verify Your Email
          </h2>
          <p className="text-muted-foreground text-sm mb-10 leading-relaxed">
            We've sent a 6-digit secure code to{" "}
            <span className="text-foreground font-semibold">{email}</span>.
            Please enter it below to activate your account.
          </p>

          <form onSubmit={handleOnSubmit} className="space-y-8">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="gap-3">
                  <InputOTPSlot
                    index={0}
                    className="w-12 h-16 md:w-14 md:h-20 text-xl font-bold rounded-2xl border-primary/20 bg-white/50 focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-12 h-16 md:w-14 md:h-20 text-xl font-bold rounded-2xl border-primary/20 bg-white/50 focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-12 h-16 md:w-14 md:h-20 text-xl font-bold rounded-2xl border-primary/20 bg-white/50 focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  <InputOTPSlot
                    index={3}
                    className="w-12 h-16 md:w-14 md:h-20 text-xl font-bold rounded-2xl border-primary/20 bg-white/50 focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  <InputOTPSlot
                    index={4}
                    className="w-12 h-16 md:w-14 md:h-20 text-xl font-bold rounded-2xl border-primary/20 bg-white/50 focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-12 h-16 md:w-14 md:h-20 text-xl font-bold rounded-2xl border-primary/20 bg-white/50 focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm font-medium"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={otp.length !== 6 || isLoading}
              className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Verify Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-primary/5">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button className="text-primary font-bold hover:underline underline-offset-4 cursor-pointer">
                Resend Code
              </button>
            </p>
          </div>
        </motion.div>
      </main>
    </div>

    // <form onSubmit={handleOnSubmit}>
    //   <h2>Verify OTP</h2>

    //   <input
    //     placeholder="Enter OTP"
    //     value={otp}
    //     onChange={(e) => {
    //       setOtp((prev) => e.target.value);
    //     }}
    //   ></input>

    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   <Button
    //     type="submit"
    //     className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
    //   >
    //     Verify
    //   </Button>
    // </form>
  );
};

export default VerifyOTP;
