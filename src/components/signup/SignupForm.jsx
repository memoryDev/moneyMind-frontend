import "./SignupForm.css";
import InputTextButton from "../input/InputTextButton";
import InputTextEmail from "../input/InputTextEmail";

const SignupForm = ({ formData, onChange, errors, useridCheck }) => {
  return (
    <>
      <div className="SignupForm">
        <h2 className="sign_title">회원가입</h2>

        <div className="sign_box">
          <InputTextButton
            name="userid"
            title="아이디"
            placeholder="아이디를 입력해주세요."
            btnName="중복 확인"
            value={formData.userid}
            onChange={onChange}
            useridCheck={useridCheck}
            error={errors.userid}
          />
          <InputTextButton
            name="password"
            title="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={formData.password}
            onChange={onChange}
            error={errors.password}
          />

          <InputTextButton
            name="confirmPassword"
            title="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인을 입력해주세요."
            value={formData.confirmPassword}
            onChange={onChange}
            error={errors.confirmPassword}
          />

          <InputTextButton
            name="name"
            title="이름"
            placeholder="이름을 입력해주세요."
            value={formData.name}
            onChange={onChange}
            error={errors.name}
          />

          <InputTextEmail
            name="email"
            domain="domain"
            title="이메일"
            placeholder="이메일 입력해주세요."
            value={formData.email}
            domainValue={formData.domain}
            onChange={onChange}
            error={errors.email}
            errorDomain={errors.domain}
          />
        </div>
      </div>
    </>
  );
};

export default SignupForm;
