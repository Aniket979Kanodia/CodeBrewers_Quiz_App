import React from "react";
import styles from "../componentsStyles/NotFound404.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const NotFound404 = ()=>{

    return(
        <div className={styles.page_404}>
	<div className={styles.container}>
		<div class="row">	
		<div class="col-sm-12">
		<div class="col-sm-10 col-sm-offset-1 text-center">
		<div className={styles.four_zero_four_bg}>
			<h1 class="text-center">404</h1>
		
		
		</div>
		
		<div className={styles.contant_box_404}>
		<h3 className={styles.h3}>
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
		
		<a href="" className={styles.link_404}>Go to Home</a>
	</div>
		</div>
		</div>
		</div>
	</div>
</div>
    )
}
export default NotFound404;
