package router

import (
	"net/http"

	"github.com/pclubiitk/puppy-love/controllers"
	"github.com/pclubiitk/puppy-love/db"

	"github.com/gin-gonic/gin"
)

func PuppyRoute(r *gin.Engine, db db.PuppyDb) {

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusAccepted, "Hello from the other side!")
	})

	controllers.Db = db

	r.GET("/stats", controllers.GetStats)

	// User administration
	users := r.Group("/users")
	{
		users.POST("/login/first", controllers.UserFirst)
		users.POST("/data/update/:you", controllers.UserUpdateData)
		users.POST("/data/submit/:you", controllers.UserSubmitTrue)
		users.POST("/image/update/:you", controllers.UserUpdateImage)
		users.POST("/pass/update/:you", controllers.UserSavePass)

		users.GET("/data/info", controllers.UserLoginGet)
		users.GET("/data/match/:you", controllers.MatchGet)
		users.GET("/get/:id", controllers.UserGet)
		users.GET("/mail/:id", controllers.UserMail)
	}

	// Listing users
	list := r.Group("/list")
	{
		list.GET("/all", controllers.ListAll)
		list.GET("/pubkey", controllers.PubkeyList)
		list.GET("/declare", controllers.DeclareList)
	}

	// Hearts
	hearts := r.Group("/hearts")
	{
		hearts.GET("/get/:time/:you", controllers.HeartGet)
	}

	// Session administration
	session := r.Group("/session")
	{
		session.POST("/login", controllers.SessionLogin)
		session.GET("/logout", controllers.SessionLogout)
	}

	// Admin
	admin := r.Group("/admin")
	{
		admin.GET("/declare/prepare", controllers.DeclarePrepare)
		admin.GET("/user/drop", controllers.UserDelete)
		admin.POST("/user/new", controllers.UserNew)
	}

}
