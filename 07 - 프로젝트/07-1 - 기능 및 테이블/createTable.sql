CREATE TABLE `hscampus`.`user` (
  `u_id` INT NOT NULL AUTO_INCREMENT,
  `u_email` INT NOT NULL,
  `u_pwd` INT NOT NULL,
  `u_nick` INT NOT NULL,
  `u_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`u_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `hscampus`.`follow` (
  `f_id` INT NOT NULL AUTO_INCREMENT,
  `f_er` INT NOT NULL,
  `f_ing` INT NOT NULL,
  `f_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`f_id`),
  INDEX `f_ing_idx` (`f_ing` ASC) VISIBLE,
  INDEX `f_er_idx` (`f_er` ASC) VISIBLE,
  CONSTRAINT `f_ing`
    FOREIGN KEY (`f_ing`)
    REFERENCES `hscampus`.`user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `f_er`
    FOREIGN KEY (`f_er`)
    REFERENCES `hscampus`.`user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `hscampus`.`board` (
  `b_id` INT NOT NULL AUTO_INCREMENT,
  `b_content` VARCHAR(255) NOT NULL,
  `b_uid` INT NOT NULL,
  `b_date` TIMESTAMP NULL DEFAULT current_timestamp,
  PRIMARY KEY (`b_id`),
  INDEX `b_uid_idx` (`b_uid` ASC) VISIBLE,
  CONSTRAINT `b_uid`
    FOREIGN KEY (`b_uid`)
    REFERENCES `hscampus`.`user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `hscampus`.`comment` (
  `c_id` INT NOT NULL AUTO_INCREMENT,
  `c_content` VARCHAR(25) NOT NULL,
  `c_uid` INT NOT NULL,
  `c_bid` INT NOT NULL,
  `c_date` TIMESTAMP NULL DEFAULT current_timestamp,
  PRIMARY KEY (`c_id`),
  INDEX `c_uid_idx` (`c_uid` ASC) VISIBLE,
  INDEX `c_bid_idx` (`c_bid` ASC) VISIBLE,
  CONSTRAINT `c_uid`
    FOREIGN KEY (`c_uid`)
    REFERENCES `hscampus`.`user` (`u_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `c_bid`
    FOREIGN KEY (`c_bid`)
    REFERENCES `hscampus`.`board` (`b_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `hscampus`.`hashtag` (
  `h_id` INT NOT NULL AUTO_INCREMENT,
  `h_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`h_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `hscampus`.`hashmap` (
  `hm_id` INT NOT NULL AUTO_INCREMENT,
  `hm_b_id` INT NOT NULL,
  `hm_h_id` INT NOT NULL,
  PRIMARY KEY (`hm_id`),
  INDEX `hm_b_id_idx` (`hm_b_id` ASC) VISIBLE,
  INDEX `hm_h_id_idx` (`hm_h_id` ASC) VISIBLE,
  CONSTRAINT `hm_b_id`
    FOREIGN KEY (`hm_b_id`)
    REFERENCES `hscampus`.`board` (`b_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `hm_h_id`
    FOREIGN KEY (`hm_h_id`)
    REFERENCES `hscampus`.`hashtag` (`h_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
