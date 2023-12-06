/**
 * @swagger
 * tags: 
 *  name: Auth
 *  description: Auth Module And Routes
 */

/**
 * @swagger
 *  components:
 *      schemas: 
 *          sendOTP:
 *              type: object
 *              required: 
 *                  -   mobile
 *              properties: 
 *                  mobile: 
 *                      type: string
 */

/**
 * @swagger
 * 
 * /auth/send-otp:
 *  post:
 *      summary: login with OTP in this end_point
 *      tags: 
 *          -   Auth
 *      requestBody: 
 *          content: 
 *              application/x-www-form-urlencoded:
 *                  schema : 
 *                      $ref: "#/components/schemas/sendOTP"
 *              application/json:
 *                  schema : 
 *                      $ref: "#/components/schemas/sendOTP"
 *      responses: 
 *          200: 
 *              description: success
 *      
 */