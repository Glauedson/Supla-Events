import styles from './verificationCode.module.css';

function VerificationCode() {
  

  return (
        <form class={styles.otp-Form}>
        
        <span class="mainHeading">Enter OTP</span>
        <p class="otpSubheading">We have sent a verification code to your mobile number</p>
        <div class="inputContainer">
        <input required="required" maxlength="1" type="text" class="otp-input" id="otp-input1"></input>
        <input required="required" maxlength="1" type="text" class="otp-input" id="otp-input2"></input>
        <input required="required" maxlength="1" type="text" class="otp-input" id="otp-input3"></input>
        <input required="required" maxlength="1" type="text" class="otp-input" id="otp-input4"> </input>
        
        </div>
        <button class="verifyButton" type="submit">Verify</button>
            <button class="exitBtn">×</button>
            <p class="resendNote">Didn't receive the code? <button class="resendBtn">Resend Code</button></p>
            
        </form>
  );
}

export default VerificationCode;