import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function subscribeOnBlog(props) {
  console.log(props);
  const onSubscribe = props.onSubscribe;
  const view = props.view;
  const isError = props.isError;
  return (
    <>
      {view ? (
        <Form className="w-75 m-auto" onSubmit={(e) => onSubscribe(e)}>
          <h6>?רוצה לקבל עדכונים לפני כולם</h6>
          <p></p>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              הרשם כאן וקבל עדכונים ישירות למייל ברגע שמשהו טעים מתפרסם
            </Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
          </Form.Group>

          <Button variant="primary" type="submit">
            הרשם
          </Button>
        </Form>
      ) : isError ? (
        <div>אופס! הייתה שגיעה, תנסו יותר מאוחר</div>
      ) : (
        <div>תודה, נהיה בקשר :)</div>
      )}
    </>
  );
}
