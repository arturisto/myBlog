import React,{Fragment, Component} from "react"
import "./blogPost.scss";
import {placePictures} from "../../../assets/images/imageConstants";
// import test from "../../../actions/test_fe_be";




class BlogPost extends Component {
    
    testit(){
        console.log("here");
        test();
    };

    render (){
    
    return ( 
        <Fragment >
            <div className="mt-3 ml-5 mr-5 ">
                <h2><i>דוגמא לפוסט</i></h2>
                <h2><i>האיטליה של ויוינו</i></h2>

                <div id="Blog Fragment" className="direction">
                    <p>
                  אחרי חודשים של הסגר ואכילת אוכל מעל השיש נפער חור קטן של רגיעה בין הגל הראשון למה שנראה כמו הגל שני של הקורונה. לכן, ניצלנו אותו לקפוץ ל ויוינו Vivino - הרובע האיטלקי ברובע של ראשון.    
                  המסעדה הינה חדשה במתחם והייתה קיימת מספר חודשים בודד לפני פרוץ קורונה.    
                  המקום מעוצב אלגנט פשוט אך בטוב טעם, השמירה על הנחיות הבריאות הינן קפדניות ביותר והשירות שקבלנו היה מהטובים מכל המסעדות שהיינו בהן ברחבי העולם (זאת לא הגזמה, זה באמת היה שירות ברמה שכמעט ולא קיימת בארץ)   
                  האוכל הינו משובח, טעים וכמובן טרי 🙂
החוויה שלנו היתה חוויה סופר חיובית ואנחנו ממליצים לכולם להגיע לסניף הזה לפחות פעם אחת   
</p>
                </div>
                <div className="direction">

                    <p>
                   פיצה קפרזה - רוטב עגבניות, מוצרלה, עגבניות שרי צלויות, קונפי שום, בזיליקום, ארוגולה, שקדים קלויים ובלסמי מצומצם, עם קרעי מוצרלה טריה וקרם פרש
      
                זו אולי הפיצת מסעדות הכי טעימה שיצא לנו לאכול. כל הפיצות נעשות במקום, במטבח פיציולו נפרד מהמטבח הכללי (בויוינו יש 2 מטבחים פתוחים!!)   
                  שילוב הטעמים של כל כך הרבה גורמים על פיצה אחת הוא מרשים ביותר ובצורה מדהימה לא נוצר כאן עומס מרכיבים.                       
                  מקפלים כל רבע פיצה ל2, אוכלים ומתמוגגים כמה שזה טעים וטרי.   
                  וכמובן, לא רואים ממש, אבל הפיצה ענקית. בערך בגודל של פיצות M של פיצריות רגילות. ככה שזה גם טעים וגם value for money.
                  </p>
                  <p>66 ש"ח </p>  

                  
                <img className="postImg"src = {placePictures.vvno_pizza} alt ="pizza"></img>
                </div> 

                <div className="direction">
                    <p>רוטולו תרד וגבינות גלילי פסטה במילוי תרד, בטטה, בצל, טימין ומרווה עם גבינות ריקוטה, פרמז'ן ומוצרלה, ברוטב עגבניות ופסטו בזיליקום

מנה ראשונה של גלילי פסטה טרייה, ממולאה בגבינות ועוד הקרמת מוצרלה מעל, מה עוד צריך בעולם הזה?
הפסטה עצמה מעולה, הגבינות מתובלות במדויק והכול משתלב נפלא עם הרוטב.
גם אחרי שהפסטה נגמרת ונשאר הרבה מילוי שנזל תוך כדי, זה כיף גדול להמשיך לנשנש אותה עם הרוטב או הפוקאצ'ה שמגיעה למרכז שולחן עם כל ארוחה.</p>
<p> 48 ש"ח</p>
                <img className="postImg" src = {placePictures.vvno_rotelo} alt ="rotelo"></img>   
                </div>  
             
        
                {/* {this.props.text} */}
                {/* <button className="bt btn-primary" onClick={()=>{this.testit()}} >test</button> */}
            </div>
        </Fragment>
        )
            
    }
}   
export default BlogPost
