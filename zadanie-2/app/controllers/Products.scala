package controllers

import javax.inject._
import play.api._
import play.api.libs.json.Json
import play.api.mvc._

import scala.collection.mutable

@Singleton
class Products @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  case class Product(id: Long, name: String, price: Double)
  case class NewProduct(name: String, price: Double)

  implicit val productFormat = Json.format[Product]
  implicit val newProductFormat = Json.format[NewProduct]

  private val products = new mutable.ListBuffer[Product]()

  products += Product(1, "test", 20.00)
  products += Product(2, "some other value", 10.50)


  def index() = Action { implicit request: Request[AnyContent] =>
    if (products.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(products))
    }
  }

  def getById(itemId: Long) = Action {
    val foundItem = products.find(_.id == itemId)
    foundItem match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def update(itemId: Long, itemName: String, itemPrice: Double) = Action {
    val foundItem = products.find(_.id == itemId)
    foundItem match {
      case Some(item) =>
        val newItem = item.copy(name = itemName, price = itemPrice)
        products.filterInPlace(_.id != itemId)
        products += newItem
        Accepted(Json.toJson(newItem))
      case None => NotFound
    }
  }

  def deleteById(itemId: Long) = Action {
    val foundItem = products.find(_.id == itemId)
    foundItem match {
      case Some(item) =>
        products.filterInPlace(_.id != item.id)
        Accepted
      case None => NotFound
    }
  }

  def addNewItem() = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson

    val newProduct: Option[NewProduct] = jsonObject.flatMap(Json.fromJson[NewProduct](_).asOpt)

    newProduct match {
      case Some(newItem) =>
        val nextId = products.map(_.id).max + 1
        val toBeAdded = Product(nextId, newItem.name, newItem.price)
        products += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }
}
