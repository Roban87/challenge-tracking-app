-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema challenge
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema challenge
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `challenge` DEFAULT CHARACTER SET utf8 ;
USE `challenge` ;

-- -----------------------------------------------------
-- Table `challenge`.`challenge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge`.`challenge` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `start_date` TIMESTAMP NOT NULL,
  `end_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `challenge`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `is_admin` TINYINT(1) NULL DEFAULT '0',
  `is_validated` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `challenge`.`commitments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge`.`commitments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `start_date` TIMESTAMP NOT NULL,
  `end_date` TIMESTAMP NOT NULL,
  `is_done` TINYINT(1) NULL DEFAULT '0',
  `user_id` INT NULL DEFAULT NULL,
  `challenge_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_fk` (`user_id` ASC) VISIBLE,
  INDEX `challenge_id_fk` (`challenge_id` ASC) VISIBLE,
  CONSTRAINT `challenge_id_fk`
    FOREIGN KEY (`challenge_id`)
    REFERENCES `challenge`.`challenge` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `user_id_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `challenge`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 48
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `challenge`.`migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge`.`migrations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `run_on` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
