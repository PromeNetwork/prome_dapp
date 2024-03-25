 import styles from "./index.module.css";
export default function Shape(){
    return(
        <>
        <div className="flex justify-center py-10 basis-3/5 items-center">
        <div className={`${styles.stage}  px-[12rem] py-[10rem]`}>
        <div className={styles.diamondLines}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
       </div>
    </div>
    </div>
        </>
    )
}
