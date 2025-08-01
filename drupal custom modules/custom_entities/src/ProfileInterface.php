<?php

declare(strict_types=1);

namespace Drupal\custom_entities;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface defining a profile entity type.
 */
interface ProfileInterface extends ContentEntityInterface, EntityOwnerInterface, EntityChangedInterface {

}
