import express from "express";
import * as userController from "../controller/userController.js";
import { isAuthenticated , isAuthorization} from "../../middlewares/auth.js";

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            minLength: 3
 *            maxLength: 30
 *            description: Enter the username
 *            example: Luu Thanh Tung
 *          email:
 *            type: string
 *            format: email
 *            description: Enter the email address
 *            example: andi@gmail.com
 *          phone:
 *            type: integer
 *            description: Enter the phone number
 *            example: 123456789
 *          password:
 *            type: string
 *            minLength: 8
 *            maxLength: 32
 *            description: Enter the password
 *            example: adminpassword12
 *          role:
 *            type: string
 *            enum: [Admin, Student]
 *            description: Select a role
 *            example: Students
 *          avatar:
 *            type: string
 *            description: Link of the user's avatar
 *            example: https://res.cloudinary.com/dkppzcbko/image/upload/v1712753198/bwcs8wa4u6ev8dlnsga3.jpg
 */

/**
 * @swagger
 * /api/v1/user:
 *    post:
 *      tags:
 *        - Users
 *      description: Create a new user
 *      summary: Create a new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        201:
 *          description: Successfully created user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  message:
 *                    type: string
 *                    example: User created successfully
 *        400:
 *          description: Bad request - Invalid input provided
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Invalid input provided
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Internal server error
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /api/v1/user/login:
 *    post:
 *      tags:
 *        - Users
 *      description: User login
 *      summary: User login
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  description: User's email address
 *                  example: andi@gmail.com
 *                password:
 *                  type: string
 *                  minLength: 8
 *                  maxLength: 32
 *                  description: User's password
 *                  example: adminpassword12
 *      responses:
 *        200:
 *          description: Successfully logged in
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  message:
 *                    type: string
 *                    example: Logged in successfully
 *        400:
 *          description: Bad request - Invalid email or password
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Invalid email or password
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Internal server error
 */

router.post("/login", userController.login);

/**
 * @swagger
 * /api/v1/user/logout:
 *    get:
 *      tags:
 *        - Users
 *      description: User logout
 *      summary: User logout
 *      responses:
 *        200:
 *          description: Successfully logged out
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Logged out successfully
 *        401:
 *          description: Unauthorized - User not logged in
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Unauthorized - User not logged in
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Internal server error
 */
router.get("/logout", isAuthenticated, userController.logout);

/**
 * @swagger
 * /api/v1/user/delete/{id}:
 *    delete:
 *      tags:
 *        - Users
 *      description: Delete a user
 *      summary: Delete a user
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the user to delete
 *          schema:
 *            type: string
 *            example: 123456789
 *      responses:
 *        200:
 *          description: Successfully deleted user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: User deleted successfully
 *        401:
 *          description: Unauthorized - User not logged in or not authorized
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Unauthorized - User not logged in or not authorized
 *        404:
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: User not found
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Internal server error
 */
router.delete("/delete/:id", isAuthenticated, isAuthorization(["Admin"]), userController.deleteUser);

export default router;
