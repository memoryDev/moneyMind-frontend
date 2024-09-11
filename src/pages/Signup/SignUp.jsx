import { useAuth } from "../../components/auth/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignupForm from "../../components/SignupForm";
import "./SignUp.css";

const SignUp = () => {
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();

  // 상태관리 : 아이디 중복
  const [isDuplicate, setIsDuplicate] = useState(false);
  // 상태관리 : 에러 메세지
  const [errors, setErrors] = useState({});
  // 상태관리 : 입력데이터
  const [formData, setFormData] = useState({
    userid: "", // 유저아이디
    password: "", // 패스워드
    confirmPasasword: "", // 패스워드 확인
    name: "", // 이름
    email: "", // 이메일
    domain: "", // 이메일 도메인
  });

  /**
   * 입력필드 값 변경될떄 호출되는 함수
   * @param {} e  이벤트
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * 가입취소 이벤트
   */
  const moveToLogin = () => {
    const isMove = confirm("회원가입을 취소 하시겠습니까?");
    if (isMove) {
      nav("/login");
    }
  };

  /**
   * 회원가입 이벤트
   * @returns
   */
  const handleSubmit = async () => {
    // 유효성 검사
    if (!validateForm()) {
      return;
    }
  };

  /**
   * 아이디 중복 체크 함수
   * @returns 아이디 중복일경우 에러코드 반환, 아이디 중복x 일시 true 반환
   */
  const handleUseridCheck = async () => {
    const newErrors = {};
    // 기존 오류 초기화
    setErrors(newErrors);

    // 아이디 입력 값이 없을경우
    if (!formData.userid.trim()) {
      newErrors.userid = "아이디를 입력해주세요.";
      setIsDuplicate(false); //로그인상태 false
      setErrors(newErrors);
      return;
    }

    try {
      // 지정한 url에 get방식으로 요청을 보냄
      const url = "/api/get/" + formData.userid.trim();
      const response = await axios.get(url); // 요청 반환값

      // HTTP 상태 코드가 OK(200)이 아닐경우 통신오류
      if (response.status !== 200) {
        alert("API 통신에 실패 하였습니다.");
        return;
      }

      // 로그인상태로 변경
      setIsDuplicate(true);

      // 성공 메세지 출력
      alert(response.data);
    } catch (error) {
      // 에러로 발생하였는데 error 객체에 response 가 없으면 오류 출력
      if (!error.response) {
        alert("API 통신에 실패 하였습니다.");
        return;
      }

      // error 객체에 응답받은 body데이터 저장
      const errorData = error.response.data;

      // error저장
      setErrors({
        userid: errorData,
      });
    }
  };

  /**
   * 회원가입 유효성 검사
   * @returns 오류 없을시 true, 있을시 false 반환
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.userid.trim()) {
      newErrors.userid = "아이디를 입력해주세요.";
    } else if (!formData.password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (!formData.confirmPasasword.trim()) {
      newErrors.confirmPasasword = "비밀번호 확인을 입력해주세요";
    } else if (formData.password.trim() !== formData.confirmPasasword.trim()) {
      newErrors.password = "비밀번호가 일치하지 않습니다.";
    } else if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    } else if (!formData.email.trim()) {
      newErrors.email = "이메일 입력해주세요.";
    } else if (!formData.domain.trim()) {
      newErrors.domain = "이메일 도메인 입력해주세요.";
    } else if (!isDuplicate) {
      newErrors.userid = "아이디 중복검사를 진행해주세요";
    }

    setIsDuplicate(true);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  /**
   * 페이지 실행후 로그인 체크
   */
  useEffect(() => {
    // 로그인 상태일경우 메인페이지로 이동
    if (isAuthenticated) {
      nav("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <SignupForm
        formData={formData}
        onChange={handleChange}
        errors={errors}
        useridCheck={handleUseridCheck}
      />
      <div className="signup_btn_wrap">
        <button className="button" onClick={handleSubmit}>
          가입하기
        </button>
        <button className="button cancel" onClick={moveToLogin}>
          가입취소
        </button>
      </div>
    </>
  );
};

export default SignUp;
