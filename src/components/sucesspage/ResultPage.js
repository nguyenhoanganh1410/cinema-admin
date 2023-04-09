import { Button, Result } from 'antd';
const ResultPage = ({setCurrent, setIsSucess}) => {
  const handleReset = () =>{
    setCurrent(0)

  }
  return (
    <Result
      status="success"
      title="Đặt vé thành công cho Nguyễn Anh"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="console" onClick={handleReset}>
          Đặt tiếp
        </Button>,
        <Button key="buy">In vé</Button>,
      ]}
    />
  
  )
}

export default ResultPage;