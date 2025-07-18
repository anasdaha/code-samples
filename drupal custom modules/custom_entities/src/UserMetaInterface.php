<?php

declare(strict_types=1);

namespace Drupal\custom_entities;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface defining an user meta entity type.
 */
interface UserMetaInterface extends ContentEntityInterface, EntityOwnerInterface, EntityChangedInterface {

}
